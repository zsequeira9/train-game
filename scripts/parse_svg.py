import xml.etree.ElementTree as ET
import re
from jinja2 import Environment, FileSystemLoader
import os.path
import json
from io import BytesIO
from copy import deepcopy

#tree = ET.parse(r'C:\Users\Chris\Documents\projects\train-game\drawing.svg')
infile = 'drawing.svg'
svg_outfile = os.path.join('.', '.', 'public', 'ticket-nobg.svg')
gameboard_outfile = os.path.join('.', '.', 'src', 'app', 'USGameboard.tsx')
route_list_outfile = os.path.join('.', '.', 'src', 'app', 'routes', 'us_routes.ts')

ns = {'svg': 'http://www.w3.org/2000/svg',
      'ttr': 'https://train-game.github.io',
          'inkscape': 'http://www.inkscape.org/namespaces/inkscape'}

ET.register_namespace('', 'http://www.w3.org/2000/svg')
ET.register_namespace('inkscape', 'http://www.inkscape.org/namespaces/inkscape')
ET.register_namespace('sodipodi', 'http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd')

jinja_env = Environment(loader=FileSystemLoader("templates/"))

def fix_doc(node):
    # Remove namespaced attributes from node
    for attrib_name in list(node.attrib.keys()):
        if 'inkscape' in attrib_name or 'sodipodi' in attrib_name or 'XML' in attrib_name:
            del node.attrib[attrib_name]
    for child in node.findall('*'):
        # Strip nodes
        if 'inkscape' in child.tag or 'sodipodi' in child.tag or child.get('id') == 'BG':
            node.remove(child)
            continue

        # Rename inkscape:label to id
        label = child.attrib.get('{http://www.inkscape.org/namespaces/inkscape}label')
        if label:
            child.set('id', label)
            del child.attrib['{http://www.inkscape.org/namespaces/inkscape}label']

        # Remove old styles
        try:
            del child.attrib['style']
        except KeyError:
            pass

    for child in node.findall('*'):
        fix_doc(child)

def make_child_route_ids(node):
    for route in node.find("*/[@id='Routes']").findall('*'):
        for ix, child in enumerate(route.findall('{http://www.w3.org/2000/svg}g')):
            child.set('id', f"{route.attrib['id']}:{ix}")

def add_additional_data_to_routes(node):
    """
    Things this method does to each route:
    
    1. Encode information into the ID
    2. add onClick attribute to the routes
    """
    ROUTE_ID_FORMAT_STRING = '{to_and_from}:{lane_index}:{color}:{length}'
    for route in node.find("*/[@id='Routes']").findall('*'): # All first-level routes (single routes + double routes)
        num_trains = len(route.findall('{http://www.w3.org/2000/svg}rect'))
        to_and_from = route.attrib['id']
    
        if num_trains > 0:
            color = route.attrib.get('class', 'grey')
            new_id = ROUTE_ID_FORMAT_STRING.format(to_and_from=to_and_from, lane_index=0, color=color, length=num_trains)
            route.set('id', new_id)
        else:
            for ix, child in enumerate(route.findall('{http://www.w3.org/2000/svg}g')):
                num_trains = len(child.findall('{http://www.w3.org/2000/svg}rect'))
                color = child.attrib.get('class', 'grey')
                new_id = ROUTE_ID_FORMAT_STRING.format(to_and_from=to_and_from, lane_index=ix, color=color, length=num_trains)
                child.set('id', new_id)


def _add_train_chips(route):
    """Add train markers for a route and its sub-routes"""
    tracks = route.findall('./{http://www.w3.org/2000/svg}rect')
    for ix,track in enumerate(tracks):
        train_chip = deepcopy(track)
        train_chip.attrib['width']= str(float(train_chip.attrib['width']) * 0.75)
        train_chip.attrib['height']= str(float(train_chip.attrib['height']) * 0.75)
        train_chip.attrib['class'] ='train'
        train_chip.attrib['id'] = f"{route.attrib['id']}:train:{ix}"
        track.attrib['class']= 'track'
        track.attrib['id'] = f"{route.attrib['id']}:track:{ix}"
        route.append(train_chip)
    for child_route in route.findall('./{http://www.w3.org/2000/svg}g'):
        _add_train_chips(child_route)

def add_train_chips(root):
    """Add train markers for every route in the document"""
    for route in root.find("*/[@id='Routes']").findall('*'):
        _add_train_chips(route)

def generate_route_file(root):
    route_list = []
    for route in root.find("*/[@id='Routes']").findall('*'):
        id = route.attrib['id']
        id_split = id.split(':')

        if len(id_split) == 1:
            # multi-lane route group
            for child in route.findall('{http://www.w3.org/2000/svg}g'):
                id = child.attrib['id']
                id_split = id.split(':')
                route_list.append({
                    "id": id,
                    "city1": id_split[0].split('-')[0],
                    "city2": id_split[0].split('-')[1],
                    "lane_index": int(id_split[1]),
                    "color": id_split[2],
                    "length": int(id_split[3]),
                })
        else: 
            # single lane route
            route_list.append({
                "id": id,
                "city1": id_split[0].split('-')[0],
                "city2": id_split[0].split('-')[1],
                "lane_index": int(id_split[1]),
                "color": id_split[2],
                "length": int(id_split[3]),
            })
    template = jinja_env.get_template("us_routes.ts.jinja")
    content = template.render(route_list=route_list)
    with open(route_list_outfile, mode="w", encoding="utf-8") as message:
        message.write(content)

def generate_gameboard_file(root):
    cities = []
    routes = []
    for city in root.find("*/[@id='Cities']").findall('*'):
        cities.append(ET.tostring(city).decode().replace('xmlns="http://www.w3.org/2000/svg"', ''))
        
    for route in root.find("*/[@id='Routes']").findall('*'):
        num_trains = len(route.findall('{http://www.w3.org/2000/svg}rect'))
        if num_trains > 0:
            # single route
            # push info about route
            route_id = route.attrib['id']
            group_attrib = {
                "isGroup": False,
                "routeId": route_id,
                "trans": route.attrib.get('transform', ''),
                "className": route.attrib['class'],
                "rects": [],
            }
            # push info about individual rects
            for rect in route.findall('{http://www.w3.org/2000/svg}rect'):
                # format class
                className = rect.attrib['class']
                if className == 'train':
                    className = f'getTrainClass("{route_id}")'
                else: 
                    className = f'"{className}"'
                    
                group_attrib["rects"].append({
                    "width": rect.attrib['width'],
                    "height": rect.attrib['height'],
                    "x": rect.attrib['x'],
                    "y": rect.attrib['y'],
                    "trans": rect.attrib['transform'],
                    "id": rect.attrib['id'],
                    "className": className
                })
            routes.append(group_attrib)
                
        else:
            # multilane route
            # push info about group
            group_attrib = {
                "isGroup": True,
                "groupId": route.attrib['id'],
                "trans": route.attrib.get('transform', ''),
                "lanes": [],
            }
            for lane in route.findall('{http://www.w3.org/2000/svg}g'):
                # push info on each lane
                lane_id = lane.attrib['id']
                route_attrib = {
                    "laneId": lane_id,
                    "trans": lane.attrib.get('transform', ''),
                    "className": lane.attrib.get('class', 'grey'),
                    "rects": [],
                }
                # push info about individual rects
                for rect in lane.findall('{http://www.w3.org/2000/svg}rect'):
                    # format class
                    className = rect.attrib['class']
                    if className == 'train': 
                        className = f'getTrainClass("{lane_id}")'
                    else: 
                        className = f'"{className}"'
                        
                    route_attrib["rects"].append({
                        "width": rect.attrib['width'],
                        "height": rect.attrib['height'],
                        "x": rect.attrib['x'],
                        "y": rect.attrib['y'],
                        "trans": rect.attrib['transform'],
                        "id": rect.attrib['id'],
                        "className": className
                    })
                group_attrib['lanes'].append(route_attrib)
            routes.append(group_attrib)    
                                    
    template = jinja_env.get_template("USGameboard.tsx.jinja")
    content = template.render(
        cities=cities,
        routes=routes,
    )
    with open(gameboard_outfile, mode="w", encoding="utf-8") as message:
        message.write(content)

tree = ET.parse(infile)

root = tree.getroot()

fix_doc(root)
make_child_route_ids(root)
add_additional_data_to_routes(root)
add_train_chips(root)

# write fixed file
open(svg_outfile,'w').write(ET.tostring(root).decode())

# write react file
generate_gameboard_file(root)

# write index of routes
generate_route_file(root)