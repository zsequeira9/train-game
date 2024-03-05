// import {
//     Route,
//     RouteColor,
// } from "../../interfaces";
import { MouseEventHandler } from "react";
import React from 'react';

interface USGameboardProps {
    claimRoute: MouseEventHandler;
}

export default function USGameboard({ claimRoute = () => { } }: USGameboardProps) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="667" viewBox="0 0 264.583 176.47686"
            version="1.1" id="svg1">
            <defs id="defs1" />
            <g id="Cities">
                <circle id="vancouver" cx="28.68" cy="27.81" r="1.965" />
                <circle id="seattle" cx="27.97" cy="41.74" r="1.965" />
                <circle id="portland" cx="22.25" cy="54.97" r="1.965" />
                <circle id="san_francisco" cx="18.63" cy="106.2" r="1.965" />
                <circle id="los_angeles" cx="38.56" cy="132.9" r="1.965" />
                <circle id="las_vegas" cx="55.58" cy="117.9" r="1.965" />
                <circle id="phoenix" cx="69.96" cy="134.6" r="1.965" />
                <circle id="salt_lake_city" cx="69.78" cy="89.35" r="1.965" />
                <circle id="helena" cx="88.21" cy="57.53" r="1.965" />
                <circle id="calgary" cx="62.55" cy="23.4" r="1.965" />
                <circle id="winnipeg" cx="120.8" cy="26.03" r="1.965" />
                <circle id="duluth" cx="149.6" cy="55.94" r="1.965" />
                <circle id="omaha" cx="142" cy="80.02" r="1.965" />
                <circle id="denver" cx="103.3" cy="97.62" r="1.965" />
                <circle id="santa_fe" cx="101.6" cy="120.6" r="1.965" />
                <circle id="el_paso" cx="100.5" cy="144.4" r="1.965" />
                <circle id="dallas" cx="147.3" cy="138.2" r="1.965" />
                <circle id="houston" cx="157.6" cy="148.5" r="1.965" />
                <circle id="oklahoma_city" cx="141.9" cy="115.3" r="1.965" />
                <circle id="little_rock" cx="165.5" cy="116.4" r="1.965" />
                <circle id="new_orleans" cx="182.1" cy="145.1" r="1.965" />
                <circle id="saint_louis" cx="169.7" cy="93.2" r="1.965" />
                <circle id="kansas_city" cx="147.2" cy="92.92" r="1.965" />
                <circle id="chicago" cx="181.3" cy="71.93" r="1.965" />
                <circle id="nashville" cx="193.9" cy="103.1" r="1.965" />
                <circle id="atlanta" cx="206.9" cy="112.2" r="1.965" />
                <circle id="charleston" cx="231.2" cy="114.2" r="1.965" />
                <circle id="miami" cx="239.5" cy="154.7" r="1.965" />
                <circle id="raleigh" cx="224.2" cy="97.22" r="1.965" />
                <circle id="washington_dc" cx="239.3" cy="79.49" r="1.965" />
                <circle id="pittsburgh" cx="215.2" cy="68.2" r="1.965" />
                <circle id="new_york" cx="236.9" cy="56.51" r="1.965" />
                <circle id="boston" cx="250.5" cy="37.3" r="1.965" />
                <circle id="montreal" cx="231.9" cy="21.81" r="1.965" />
                <circle id="toronto" cx="211" cy="44.3" r="1.965" />
                <circle id="sault_st_marie" cx="182.6" cy="38.71" r="1.965" />
            </g>
            <g id="Routes">
                <g id="vancouver-calgary:0:grey:3" transform="translate(4.511,-0.575)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.756" height="3.128" x="32.89" y="28.6"
                        transform="rotate(-6.194,1.139,77.13)" id="rect34" />
                    <rect width="8.756" height="3.128" x="32.89" y="28.6"
                        transform="rotate(-6.194,-3.489,-8.409)" id="rect35" />
                    <rect width="8.756" height="3.128" x="32.89" y="28.6"
                        transform="rotate(-6.194,-8.117,-93.94)" id="rect36" />
                </g>
                <g id="seattle-helena:0:yellow:6" transform="translate(4.252,1.001)" className="yellow"
                    onClick={claimRoute}>
                    <rect width="8.867" height="3.117" x="91.76" y="55.62"
                        transform="rotate(12.82,116.5,-238.4)" id="rect42" />
                    <rect width="8.867" height="3.117" x="91.76" y="55.62"
                        transform="rotate(12.82,111.8,-196.8)" id="rect43" />
                    <rect width="8.867" height="3.117" x="91.76" y="55.62"
                        transform="rotate(12.82,107.1,-155.1)" id="rect44" />
                    <rect width="8.867" height="3.117" x="91.76" y="55.62"
                        transform="rotate(12.82,102.4,-113.4)" id="rect45" />
                    <rect width="8.867" height="3.117" x="91.76" y="55.62"
                        transform="rotate(12.82,97.76,-71.73)" id="rect46" />
                    <rect width="8.867" height="3.117" x="91.76" y="55.62"
                        transform="rotate(12.82,93.08,-30.05)" id="rect47" />
                </g>
                <g id="helena-duluth:0:orange:6" transform="translate(3.524,-0.2394)" className="orange"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="91.68" y="55.57"
                        transform="matrix(0.9993,-0.0361,0.0361,0.9993,-6.495,3.579)" id="rect54" />
                    <rect width="8.991" height="3.175" x="91.68" y="55.57"
                        transform="matrix(0.9993,-0.0361,0.0361,0.9993,3.049,3.407)" id="rect55" />
                    <rect width="8.991" height="3.175" x="91.68" y="55.57"
                        transform="matrix(0.9993,-0.0361,0.0361,0.9993,12.59,3.235)" id="rect56" />
                    <rect width="8.991" height="3.175" x="91.68" y="55.57"
                        transform="matrix(0.9993,-0.0361,0.0361,0.9993,22.14,3.063)" id="rect57" />
                    <rect width="8.991" height="3.175" x="91.68" y="55.57"
                        transform="matrix(0.9993,-0.0361,0.0361,0.9993,31.68,2.891)" id="rect58" />
                    <rect width="8.991" height="3.175" x="91.68" y="55.57"
                        transform="matrix(0.9993,-0.0361,0.0361,0.9993,41.21,2.719)" id="rect59" />
                </g>
                <g id="san_francisco-salt_lake_city" transform="translate(0.0884,-0.0884)" onClick={claimRoute}>
                    <g id="san_francisco-salt_lake_city:0:orange:5" transform="translate(2.211,-0.7961)"
                        className="orange">
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="rotate(-20.69,115.5,227.4)" id="rect64" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="rotate(-20.69,111.7,201.2)" id="rect65" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="rotate(-20.69,107.9,175)" id="rect66" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="rotate(-20.69,104.1,148.9)" id="rect67" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="rotate(-20.69,100.3,122.7)" id="rect68" />
                    </g>
                    <g id="san_francisco-salt_lake_city:1:white:5" transform="translate(3.273,2.122)"
                        className="white">
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="rotate(-20.69,115.5,227.4)" id="rect69" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="rotate(-20.69,111.7,201.2)" id="rect70" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.9356,-0.3532,0.3532,0.9356,-45.91,46.39)" id="rect72" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.9356,-0.3532,0.3532,0.9356,-54.88,49.4)" id="rect71" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="rotate(-20.69,100.3,122.7)" id="rect73" />
                    </g>
                </g>
                <g id="calgary-helena:0:grey:4" transform="translate(2.387,2.938)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.6679,0.7442,-0.7442,0.6679,74.66,-80.44)" id="rect79" />
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.6679,0.7442,-0.7442,0.6679,80.75,-73.15)" id="rect80" />
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.6679,0.7442,-0.7442,0.6679,86.83,-65.86)" id="rect81" />
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.6679,0.7442,-0.7442,0.6679,92.92,-58.56)" id="rect82" />
                </g>
                <g id="helena-denver:0:grey:4" transform="translate(1.677,3.665)" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.4099,0.9121,-0.9121,0.4099,131.5,-38.84)" id="rect97" />
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.4099,0.9121,-0.9121,0.4099,135.1,-30.04)" id="rect98" />
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.4099,0.9121,-0.9121,0.4099,138.7,-21.24)" id="rect99" />
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.4099,0.9121,-0.9121,0.4099,142.2,-12.44)" id="rect100" />
                </g>
                <g id="oklahoma_city-kansas_city" className="grey" onClick={claimRoute}>
                    <g id="oklahoma_city-kansas_city:0:grey:2" transform="translate(0.8124,-3.441)">
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.2536,-0.9673,0.9673,0.2536,47.4,162.7)" id="rect101" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.2536,-0.9673,0.9673,0.2536,50.11,153.7)" id="rect102" />
                    </g>
                    <g id="oklahoma_city-kansas_city:1:grey:2" transform="translate(4.091,-2.453)">
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.2536,-0.9673,0.9673,0.2536,47.4,162.7)" id="rect101-4" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.2536,-0.9673,0.9673,0.2536,50.11,153.7)" id="rect102-9" />
                    </g>
                </g>
                <g id="kansas_city-saint_louis" onClick={claimRoute}>
                    <g id="kansas_city-saint_louis:0:blue:2" transform="translate(4.017,-0.0974)"
                        className="blue">
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.9984,-0.0561,0.0561,0.9984,72.58,16.67)" id="rect103" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.9984,-0.0561,0.0561,0.9984,81.98,16.48)" id="rect104" />
                    </g>
                    <g id="kansas_city-saint_louis:1:pink:2" transform="translate(3.972,3.2)"
                        className="pink">
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.9984,-0.0561,0.0561,0.9984,72.58,16.67)" id="rect103-2" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.9984,-0.0561,0.0561,0.9984,81.98,16.48)" id="rect104-0" />
                    </g>
                </g>
                <g id="omaha-kansas_city" transform="translate(0.0487,-0.2678)" className="grey" onClick={claimRoute}>
                    <g id="omaha-kansas_city:0:grey:1" transform="translate(-0.8353,5.527)">
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.5065,0.8622,-0.8622,0.5065,175.4,-20.96)" id="rect105-0" />
                    </g>
                    <g id="omaha-kansas_city:1:grey:1" transform="translate(2.078,3.765)">
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.5065,0.8622,-0.8622,0.5065,175.4,-20.96)" id="rect105" />
                    </g>
                </g>
                <g id="omaha-duluth" className="grey" onClick={claimRoute}>
                    <g id="omaha-duluth:0:grey:2" transform="translate(1.711,-3.402)">
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.3329,-0.9429,0.9429,0.3329,45.11,119.2)" id="rect109" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.3329,-0.9429,0.9429,0.3329,48.55,110.4)" id="rect110" />
                    </g>
                    <g id="omaha-duluth:1:grey:2" transform="translate(-1.584,-4.709)">
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.3329,-0.9429,0.9429,0.3329,45.11,119.2)" id="rect109-2" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.3329,-0.9429,0.9429,0.3329,48.55,110.4)" id="rect110-6" />
                    </g>
                </g>
                <g id="helena-omaha:0:red:5" transform="translate(3.868,1.466)" className="red" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.9373,0.3485,-0.3485,0.9373,53.36,-38.58)" id="rect111" />
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.9373,0.3485,-0.3485,0.9373,62.04,-34.98)" id="rect112" />
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.9373,0.3485,-0.3485,0.9373,70.73,-31.39)" id="rect113" />
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.9373,0.3485,-0.3485,0.9373,79.41,-27.8)" id="rect114" />
                    <rect width="8.991" height="3.175" x="68.64" y="76.94"
                        transform="matrix(0.9373,0.3485,-0.3485,0.9373,88.1,-24.21)" id="rect115" />
                </g>
                <g id="salt_lake_city-denver" onClick={claimRoute}>
                    <g id="salt_lake_city-denver:0:black:3"
                        transform="matrix(0.9703,0,0,0.9318,5.912,9.958)" className="black">
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.988,0.1539,-0.1539,0.988,13.06,-0.8137)" id="rect124-6" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.988,0.1539,-0.1539,0.988,22.29,0.9673)" id="rect125-9" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.988,0.1539,-0.1539,0.988,31.52,2.748)" id="rect126-9" />
                    </g>
                    <g id="salt_lake_city-denver:1:red:3" transform="matrix(0.9702,0,0,0.9319,6.461,6.707)"
                        className="red">
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.988,0.1539,-0.1539,0.988,13.06,-0.8137)" id="rect124" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.988,0.1539,-0.1539,0.988,22.29,0.9673)" id="rect125" />
                        <rect width="8.991" height="3.175" x="68.64" y="76.94"
                            transform="matrix(0.988,0.1539,-0.1539,0.988,31.52,2.748)" id="rect126" />
                    </g>
                </g>
                <g id="montreal-boston" className="grey" onClick={claimRoute}>
                    <g id="montreal-boston:0:grey:2" transform="translate(2.46,3.949)">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.8006,0.5991,-0.5991,0.8006,221.5,-78.72)" id="rect48" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.8006,0.5991,-0.5991,0.8006,228.8,-72.83)" id="rect49" />
                    </g>
                    <g id="montreal-boston:1:grey:2" transform="translate(0.3607,6.472)">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.8006,0.5991,-0.5991,0.8006,221.5,-78.72)" id="rect48-0" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.8006,0.5991,-0.5991,0.8006,228.8,-72.83)" id="rect49-4" />
                    </g>
                </g>
                <g id="new_york-boston" onClick={claimRoute}>
                    <g id="new_york-boston:0:red:2" transform="translate(0.7769,-3.949)" className="red">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.5211,-0.8535,0.8535,0.5211,144.4,80.84)" id="rect62" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.5211,-0.8535,0.8535,0.5211,149.6,73)" id="rect63" />
                    </g>
                    <g id="new_york-boston:1:yellow:2" transform="translate(-2.009,-5.955)"
                        className="yellow">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.5211,-0.8535,0.8535,0.5211,144.4,80.84)" id="rect62-3" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.5211,-0.8535,0.8535,0.5211,149.6,73)" id="rect63-5" />
                    </g>
                </g>
                <g id="montreal-new_york:0:blue:3" transform="translate(-1.877,-3.302)" className="blue"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(-0.2057,-0.9786,0.9786,-0.2057,181.8,137.2)" id="rect74" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(-0.2057,-0.9786,0.9786,-0.2057,180.2,128)" id="rect75" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(-0.2057,-0.9786,0.9786,-0.2057,178.6,118.7)" id="rect76" />
                </g>
                <g id="raleigh-washington" className="grey" onClick={claimRoute}>
                    <g id="raleigh-washington:0:grey:2" transform="translate(1.877,-4.143)">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.6057,-0.7956,0.7956,0.6057,128.1,111.6)" id="rect83" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.6057,-0.7956,0.7956,0.6057,134.1,104.3)" id="rect84" />
                    </g>
                    <g id="raleigh-washington:1:grey:2" transform="translate(-0.7671,-6.241)">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.6057,-0.7956,0.7956,0.6057,128.1,111.6)" id="rect83-3" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.6057,-0.7956,0.7956,0.6057,134.1,104.3)" id="rect84-3" />
                    </g>
                </g>
                <g id="atlanta-raleigh" className="grey" onClick={claimRoute}>
                    <g id="atlanta-raleigh:0:grey:2" transform="translate(2.395,-3.69)">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.7411,-0.6713,0.6713,0.7411,109.7,108.2)" id="rect85" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.7411,-0.6713,0.6713,0.7411,116.9,102.1)" id="rect86" />
                    </g>
                    <g id="atlanta-raleigh:1:grey:2" transform="translate(0.0995,-6.185)">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.7411,-0.6713,0.6713,0.7411,109.7,108.2)" id="rect85-4" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.7411,-0.6713,0.6713,0.7411,116.9,102.1)" id="rect86-1" />
                    </g>
                </g>
                <g id="sault_st_marie-toronto:0:grey:2" transform="translate(3.891,2.289)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9865,0.1633,-0.1633,0.9865,127.9,-43.92)" id="rect87" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9865,0.1633,-0.1633,0.9865,137.1,-42.05)" id="rect88" />
                </g>
                <g id="duluth-sault_st_marie:0:grey:3" transform="translate(4.395,-0.6409)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9041,-0.4272,0.4272,0.9041,58.86,16.89)" id="rect89" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9041,-0.4272,0.4272,0.9041,67.5,13.18)" id="rect90" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9041,-0.4272,0.4272,0.9041,76.14,9.478)" id="rect91" />
                </g>
                <g id="winnipeg-duluth:0:grey:4" transform="translate(1.877,3.937)" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.7413,0.6711,-0.6711,0.7413,117.9,-74.11)" id="rect92" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.7413,0.6711,-0.6711,0.7413,124.6,-67.55)" id="rect93" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.7413,0.6711,-0.6711,0.7413,131.4,-61)" id="rect94" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.7413,0.6711,-0.6711,0.7413,138.1,-54.44)" id="rect95" />
                </g>
                <g id="winnipeg-sault_st_marie:0:grey:6" transform="translate(3.937,2.518)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9849,0.1727,-0.1727,0.9849,67.51,-58.58)" id="rect96" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9849,0.1727,-0.1727,0.9849,76.71,-56.63)" id="rect106" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9849,0.1727,-0.1727,0.9849,85.9,-54.67)" id="rect107" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9849,0.1727,-0.1727,0.9849,95.09,-52.71)" id="rect108" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9849,0.1727,-0.1727,0.9849,104.3,-50.76)" id="rect116" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9849,0.1727,-0.1727,0.9849,113.5,-48.8)" id="rect117" />
                </g>
                <g id="santa_fe-denver:0:grey:2" transform="translate(1.648,-4.212)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(-0.008,-0.9999,0.9999,-0.008,29.76,190.8)" id="rect118" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(-0.008,-0.9999,0.9999,-0.008,30.02,181.4)" id="rect119" />
                </g>
                <g id="houston-new_orleans:0:grey:2" transform="translate(3.82,-2.072)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9808,-0.1946,0.1946,0.9808,76.58,93.34)" id="rect120" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9808,-0.1946,0.1946,0.9808,85.86,91.84)" id="rect121" />
                </g>
                <g id="saint_louis-nashville:0:grey:2" transform="translate(3.626,2.654)" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9654,0.2605,-0.2605,0.9654,122,8.527)" id="rect122" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9654,0.2605,-0.2605,0.9654,130.9,11.3)" id="rect123" />
                </g>
                <g id="little_rock-saint_louis:0:grey:2" transform="translate(2.719,-3.431)"
                    className="grey" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.2191,-0.9756,0.9756,0.2191,78.74,166.9)" id="rect127" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.2191,-0.9756,0.9756,0.2191,81.13,157.8)" id="rect128" />
                </g>
                <g id="oklahoma_city-little_rock:0:grey:2" transform="translate(3.949,-1.424)"
                    className="grey" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9982,-0.0587,0.0587,0.9982,69.3,49.92)" id="rect129" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9982,-0.0587,0.0587,0.9982,78.7,49.71)" id="rect130" />
                </g>
                <g id="dallas-little_rock:0:grey:2" transform="translate(3.496,-2.395)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.5477,-0.8366,0.8366,0.5477,51.78,153.3)" id="rect131" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.5477,-0.8366,0.8366,0.5477,57.21,145.7)" id="rect132" />
                </g>
                <g id="oklahoma_city-dallas" className="grey" onClick={claimRoute}>
                    <g id="oklahoma_city-dallas:0:grey:2" transform="translate(1.942,4.143)">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.1571,0.9875,-0.9875,0.1571,200.5,35.47)" id="rect133" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.1571,0.9875,-0.9875,0.1571,201.7,44.8)" id="rect134" />
                    </g>
                    <g id="oklahoma_city-dallas:1:grey:2" transform="translate(5.337,3.804)">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.1571,0.9875,-0.9875,0.1571,200.5,35.47)" id="rect133-2" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.1571,0.9875,-0.9875,0.1571,201.7,44.8)" id="rect134-4" />
                    </g>
                </g>
                <g id="phoenix-el_paso:0:grey:3" transform="translate(3.937,2.747)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9693,0.2456,-0.2456,0.9693,20.25,47.38)" id="rect135" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9693,0.2456,-0.2456,0.9693,29.27,50.02)" id="rect136" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9693,0.2456,-0.2456,0.9693,38.3,52.65)" id="rect137" />
                </g>
                <g id="phoenix-santa_fe:0:grey:3" transform="translate(4.395,-0.1831)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9017,-0.4322,0.4322,0.9017,-22.18,97.96)" id="rect138" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9017,-0.4322,0.4322,0.9017,-13.56,94.21)" id="rect139" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9017,-0.4322,0.4322,0.9017,-4.942,90.46)" id="rect140" />
                </g>
                <g id="el_paso-santa_fe:0:grey:2" transform="translate(1.556,-3.662)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.0213,-0.9997,0.9997,0.0213,26.29,211.6)" id="rect141" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.0213,-0.9997,0.9997,0.0213,26.83,202.2)" id="rect142" />
                </g>
                <g id="salt_lake_city-helena:0:pink:3" transform="translate(3.571,-2.93)" className="pink"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.4786,-0.878,0.878,0.4786,-25.4,112.4)" id="rect143" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.4786,-0.878,0.878,0.4786,-20.6,104.3)" id="rect144" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.4786,-0.878,0.878,0.4786,-15.81,96.21)" id="rect145" />
                </g>
                <g id="new_york-washington" onClick={claimRoute}>
                    <g id="new_york-washington:0:orange:2" transform="translate(1.198,-3.95)"
                        className="orange">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(-0.0646,-0.9979,0.9979,-0.0646,169.8,153.3)" id="rect147" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(-0.0646,-0.9979,0.9979,-0.0646,169.5,144)" id="rect148" />
                    </g>
                    <g id="new_york-washington:1:black:2" transform="translate(4.52,-4.156)"
                        className="black">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(-0.0646,-0.9979,0.9979,-0.0646,169.8,153.3)" id="rect147-1" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(-0.0646,-0.9979,0.9979,-0.0646,169.5,144)" id="rect148-0" />
                    </g>
                </g>
                <g id="el_paso-dallas:0:red:4" transform="translate(3.662,-2.014)" className="red"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9852,-0.1713,0.1713,0.9852,25.13,88.25)" id="rect162" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9852,-0.1713,0.1713,0.9852,34.44,86.98)" id="rect163" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9852,-0.1713,0.1713,0.9852,43.75,85.7)" id="rect164" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9852,-0.1713,0.1713,0.9852,53.07,84.43)" id="rect165" />
                </g>
                <g id="atlanta-charleston:0:grey :2" transform="translate(4.395,-1.419)" className="grey "
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9999,-0.0026,0.0026,0.9999,138.6,45.36)" id="rect166" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9999,-0.0026,0.0026,0.9999,148,45.68)" id="rect167" />
                </g>
                <g id="pittsburgh-washington:0:grey:2" transform="translate(4.303,0.3662)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9081,0.4187,-0.4187,0.9081,183,-23.01)" id="rect168" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9081,0.4187,-0.4187,0.9081,191.4,-18.77)" id="rect169" />
                </g>
                <g id="pittsburgh-raleigh:0:grey:2" transform="translate(2.106,4.029)" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.2684,0.9632,-0.9632,0.2684,265.3,-14.55)" id="rect170" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.2684,0.9632,-0.9632,0.2684,267.5,-5.415)" id="rect171" />
                </g>
                <g id="toronto-pittsburgh:0:grey:2" transform="translate(1.101,-4.532)" className="grey"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(-0.1081,-0.9941,0.9941,-0.1081,149.7,143.8)" id="rect172" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(-0.1081,-0.9941,0.9941,-0.1081,149,134.4)" id="rect173" />
                </g>
                <g id="atlanta-miami:0:blue:5" transform="translate(3.569,2.335)" className="blue"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.6545,0.756,-0.756,0.6545,213.8,16.35)" id="rect174" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.6545,0.756,-0.756,0.6545,219.7,23.67)" id="rect175" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.6545,0.756,-0.756,0.6545,225.6,31)" id="rect176" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.6545,0.756,-0.756,0.6545,231.5,38.32)" id="rect177" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.6545,0.756,-0.756,0.6545,237.3,45.64)" id="rect178" />
                </g>
                <g id="little_rock-new_orleans:0:green:3" transform="translate(3.388,3.662)"
                    className="green" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.4991,0.8665,-0.8665,0.4991,191.3,21.05)" id="rect179" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.4991,0.8665,-0.8665,0.4991,195.7,29.36)" id="rect180" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.4991,0.8665,-0.8665,0.4991,200.1,37.67)" id="rect181" />
                </g>
                <g id="duluth-toronto:0:pink:6" transform="translate(3.845,0.7325)" className="pink"
                    onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9797,-0.2004,0.2004,0.9797,67.65,-1.52)" id="rect182" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9797,-0.2004,0.2004,0.9797,76.92,-3.07)" id="rect183" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9797,-0.2004,0.2004,0.9797,86.19,-4.62)" id="rect184" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9797,-0.2004,0.2004,0.9797,95.46,-6.17)" id="rect185" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9797,-0.2004,0.2004,0.9797,104.7,-7.72)" id="rect186" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.9797,-0.2004,0.2004,0.9797,114,-9.271)" id="rect187" />
                </g>
                <g id="saint_louis-chicago" onClick={claimRoute}>
                    <g id="saint_louis-chicago:0:green:2" transform="translate(3.302,-2.59)"
                        className="green">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.5006,-0.8656,0.8656,0.5006,69.61,114.9)" id="rect188" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.5006,-0.8656,0.8656,0.5006,74.61,106.9)" id="rect189" />
                    </g>
                    <g id="saint_louis-chicago:1:white:2" transform="translate(6.087,-0.7083)"
                        className="white">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.5006,-0.8656,0.8656,0.5006,69.61,114.9)" id="rect188-8" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.5006,-0.8656,0.8656,0.5006,74.61,106.9)" id="rect189-6" />
                    </g>
                </g>
                <g id="pittsburgh-new_york" transform="translate(0.1942,0.0647)" onClick={claimRoute}>
                    <g id="pittsburgh-new_york:0:white:2" transform="translate(4.532,-0.9711)"
                        className="white">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.8446,-0.5354,0.5354,0.8446,117.4,41.32)" id="rect190" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.8446,-0.5354,0.5354,0.8446,125.6,36.58)" id="rect191" />
                    </g>
                    <g id="pittsburgh-new_york:1:green:2" transform="translate(6.146,1.946)"
                        className="green">
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.8446,-0.5354,0.5354,0.8446,117.4,41.32)" id="rect190-4" />
                        <rect width="8.991" height="3.175" x="67.46" y="69.54"
                            transform="matrix(0.8446,-0.5354,0.5354,0.8446,125.6,36.58)" id="rect191-5" />
                    </g>
                </g>
                <g id="saint_louis-pittsburgh:0:green:5" transform="translate(4.467,-0.9711)"
                    className="green" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.8487,-0.5288,0.5288,0.8487,73.12,70.34)" id="rect192" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.8487,-0.5288,0.5288,0.8487,81.27,65.66)" id="rect193" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.8487,-0.5288,0.5288,0.8487,89.42,60.98)" id="rect194" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.8487,-0.5288,0.5288,0.8487,97.58,56.3)" id="rect195" />
                    <rect width="8.991" height="3.175" x="67.46" y="69.54"
                        transform="matrix(0.8487,-0.5288,0.5288,0.8487,105.7,51.63)" id="rect196" />
                </g>
                <g id="raleigh-charleston:0:grey:2" className="grey" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="241.6" y="-50.24" transform="rotate(35.07)"
                        id="rect59-3-2" />
                    <rect width="8.991" height="3.175" x="-0.2804" y="255.7" transform="rotate(-64.3)"
                        id="rect59-3-59" />
                </g>
                <g id="charleston-miami:0:pink:4" className="pink" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="-131.5" y="226.6" transform="rotate(-91.59)"
                        id="rect59-3-61" />
                    <rect width="8.991" height="3.175" x="-156.2" y="217.4" transform="rotate(-95.43)"
                        id="rect59-3-598" />
                    <rect width="8.991" height="3.175" x="186.2" y="-196.7" transform="rotate(76.42)"
                        id="rect59-3-1" />
                    <rect width="8.991" height="3.175" x="243" y="-133.6" transform="rotate(59.88)"
                        id="rect59-3-80" />
                </g>
                <g id="new_orleans-miami:0:red:6" className="red" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="263.5" y="-77.23" transform="rotate(49.07)"
                        id="rect59-3-06" />
                    <rect width="8.991" height="3.175" x="261.6" y="-43.01" transform="rotate(41.75)"
                        id="rect59-3-63" />
                    <rect width="8.991" height="3.175" x="254.6" y="17.69" transform="rotate(28.59)"
                        id="rect59-3-86" />
                    <rect width="8.991" height="3.175" x="199.4" y="144.4" transform="rotate(-2.069)"
                        id="rect59-3-94" />
                    <rect width="8.991" height="3.175" x="160.2" y="178.4" transform="rotate(-12.54)"
                        id="rect59-3-52" />
                    <rect width="8.991" height="3.175" x="90.58" y="217.9" transform="rotate(-29.64)"
                        id="rect59-3-03" />
                </g>
                <g id="dallas-houston" className="grey" onClick={claimRoute}>
                    <g id="dallas-houston:0:grey:1">
                        <rect width="8.991" height="3.175" x="203.4" y="-20.52" transform="rotate(48.86)"
                            id="rect59-3-4" />
                    </g>
                    <g id="dallas-houston:1:grey:1">
                        <rect width="8.991" height="3.175" x="203.5" y="-23.94" transform="rotate(48.86)"
                            id="rect59-3-4-5" />
                    </g>
                </g>
                <g id="el_paso-houston:0:green:6" className="green" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="85.57" y="193.2" transform="rotate(-20.05)"
                        id="rect59-3-95" />
                    <rect width="8.991" height="3.175" x="117.5" y="169" transform="rotate(-7.013)"
                        id="rect59-3-50" />
                    <rect width="8.991" height="3.175" x="129" y="153.1" transform="rotate(0.2222)"
                        id="rect59-3-35" />
                    <rect width="8.991" height="3.175" x="140.3" y="132.9" transform="rotate(8.458)"
                        id="rect59-3-14" />
                    <rect width="8.991" height="3.175" x="151.8" y="107.1" transform="rotate(18.26)"
                        id="rect59-3-04" />
                    <rect width="8.991" height="3.175" x="162.5" y="72.15" transform="rotate(30.64)"
                        id="rect59-3-41" />
                </g>
                <g id="los_angeles-el_paso:0:black:6" className="black" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="49.92" y="161.2"
                        transform="matrix(0.9737,-0.228,0.228,0.9737,0,0)" id="rect59-3-01" />
                    <rect width="8.991" height="3.175" x="70.63" y="148.9" transform="rotate(-2.069)"
                        id="rect59-3-38" />
                    <rect width="8.991" height="3.175" x="83.15" y="136.4" transform="rotate(6.63)"
                        id="rect59-3-53" />
                    <rect width="8.991" height="3.175" x="89.53" y="125.7" transform="rotate(13.34)"
                        id="rect59-3-28" />
                    <rect width="8.991" height="3.175" x="102.4" y="106.6" transform="rotate(24.19)"
                        id="rect59-3-610" />
                    <rect width="8.991" height="3.175" x="113.6" y="81.48" transform="rotate(36.9)"
                        id="rect59-3-636" />
                </g>
                <g id="el_paso-oklahoma_city:0:yellow:5" className="yellow" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="58.8" y="164" transform="rotate(-16.16)"
                        id="rect59-3-43" />
                    <rect width="8.991" height="3.175" x="34.53" y="174.4" transform="rotate(-27.47)"
                        id="rect59-3-64" />
                    <rect width="8.991" height="3.175" x="22.17" y="178.7" transform="rotate(-34.51)"
                        id="rect59-3-65" />
                    <rect width="8.991" height="3.175" x="0.4525" y="181.3" transform="rotate(-44.35)"
                        id="rect59-3-56" />
                    <rect width="8.991" height="3.175" x="-23.85" y="179.8" transform="rotate(-54.87)"
                        id="rect59-3-47" />
                </g>
                <g id="santa_fe-oklahoma_city:0:blue:3" className="blue" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="112.1" y="127.9" transform="rotate(-5.23)"
                        id="rect59-3-88" />
                    <rect width="8.991" height="3.175" x="104.3" y="126.9" transform="rotate(-4.558)"
                        id="rect59-3-93" />
                    <rect width="8.991" height="3.175" x="93.71" y="128.2" transform="rotate(-5.076)"
                        id="rect59-3-25" />
                </g>
                <g id="denver-oklahoma_city:0:grey:4" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="146.2" y="-5.136" transform="rotate(45.43)"
                        id="rect59-3-00" />
                    <rect width="8.991" height="3.175" x="148.9" y="44.59" transform="rotate(26.82)"
                        id="rect59-3-21" />
                    <rect width="8.991" height="3.175" x="135.3" y="92.26" transform="rotate(8.306)"
                        id="rect59-3-16" />
                    <rect width="8.991" height="3.175" x="135.5" y="105.1" transform="rotate(3.055)"
                        id="rect59-3-98" />
                </g>
                <g id="los_angeles-phoenix:0:grey:3" className="grey" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="84.96" y="113.4" transform="rotate(11.84)"
                        id="rect59-3-51" />
                    <rect width="8.991" height="3.175" x="48.67" y="129" transform="rotate(-0.6897)"
                        id="rect59-3-36" />
                    <rect width="8.991" height="3.175" x="24.09" y="133.6" transform="rotate(-7.205)"
                        id="rect59-3-37" />
                </g>
                <g id="los_angeles-los_vegas:0:grey:2" className="grey" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="-95.94" y="92.54" transform="rotate(-62.53)"
                        id="rect59-3-534" />
                    <rect width="8.991" height="3.175" x="15" y="125" transform="rotate(-13.35)"
                        id="rect59-3-89" />
                </g>
                <g id="phoneix-denver:0:white:5" className="white" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="-96.76" y="113.2" transform="rotate(-68.37)"
                        id="rect59-3-008" />
                    <rect width="8.991" height="3.175" x="-66.7" y="126.2" transform="rotate(-58.55)"
                        id="rect59-3-047" />
                    <rect width="8.991" height="3.175" x="-47.15" y="130.1" transform="rotate(-54.04)"
                        id="rect59-3-92" />
                    <rect width="8.991" height="3.175" x="-6.224" y="135.2" transform="rotate(-40.55)"
                        id="rect59-3-90" />
                    <rect width="8.991" height="3.175" x="46.17" y="127.5" transform="rotate(-22.24)"
                        id="rect59-3-253" />
                </g>
                <g id="portland-salt_lake_city:0:blue:6" className="blue" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="100.3" y="-20.19" transform="rotate(61.22)"
                        id="rect59-3-646" />
                    <rect width="8.991" height="3.175" x="92.42" y="0.394" transform="rotate(49.46)"
                        id="rect59-3-909" />
                    <rect width="8.991" height="3.175" x="81.79" y="14.99" transform="rotate(40.44)"
                        id="rect59-3-633" />
                    <rect width="8.991" height="3.175" x="69.86" y="24.16" transform="rotate(34.06)"
                        id="rect59-3-49" />
                    <rect width="8.991" height="3.175" x="52.06" y="40.37" transform="rotate(19.95)"
                        id="rect59-3-24" />
                    <rect width="8.991" height="3.175" x="36.85" y="47.22" transform="rotate(12.35)"
                        id="rect59-3-91" />
                </g>
                <g id="portland-seattle" className="grey" onClick={claimRoute}>
                    <g id="portland-seattle:0:grey:1">
                        <rect width="8.991" height="3.175" x="-39.97" y="37.71" transform="rotate(-68.23)"
                            id="rect59-3-42" />
                    </g>
                    <g id="portland-seattle:1:grey:1" transform="translate(3.172,1.466)">
                        <rect width="8.991" height="3.175" x="-39.97" y="37.71" transform="rotate(-68.23)"
                            id="rect59-3-42-4" />
                    </g>
                </g>
                <g id="vancouver-seattle" className="grey" onClick={claimRoute}>
                    <g id="vancouver-seattle:0:grey:1">
                        <rect width="8.991" height="3.175" x="-39.46" y="24.38" transform="rotate(-90.88)"
                            id="rect59-3-888" />
                    </g>
                    <g id="vancouver-seattle:1:grey:1" transform="translate(3.403,-0.0443)">
                        <rect width="8.991" height="3.175" x="-39.46" y="24.38" transform="rotate(-90.88)"
                            id="rect59-3-888-6" />
                    </g>
                </g>
                <g id="seattle-calgary:0:grey:4" className="grey" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="29.62" y="41" transform="rotate(-2.069)"
                        id="rect59-3-422" />
                    <rect width="8.991" height="3.175" x="38.12" y="42.23" transform="rotate(-3.643)"
                        id="rect59-3-81" />
                    <rect width="8.991" height="3.175" x="17.02" y="60.6" transform="rotate(-36.13)"
                        id="rect59-3-68" />
                    <rect width="8.991" height="3.175" x="-2.547" y="65.46" transform="rotate(-61.61)"
                        id="rect59-3-69" />
                </g>
                <g id="chicago-toronto:0:white:4" className="white" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="77.15" y="174" transform="rotate(-45.69)"
                        id="rect59-3-08" />
                    <rect width="8.991" height="3.175" x="119.8" y="153.2" transform="rotate(-34.21)"
                        id="rect59-3-049" />
                    <rect width="8.991" height="3.175" x="167.5" y="110.4" transform="rotate(-17.8)"
                        id="rect59-3-77" />
                    <rect width="8.991" height="3.175" x="128.7" y="164.1" transform="rotate(-37.67)"
                        id="rect59-3-425" />
                </g>
                <g id="nashville-pittsburgh:0:yellow:4" className="yellow" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="51.55" y="216.7" transform="rotate(-55.68)"
                        id="rect59-3-030" />
                    <rect width="8.991" height="3.175" x="110.3" y="187.6" transform="rotate(-36.64)"
                        id="rect59-3-74" />
                    <rect width="8.991" height="3.175" x="52.67" y="208" transform="rotate(-50.44)"
                        id="rect59-3-66" />
                    <rect width="8.991" height="3.175" x="0.114" y="214.5" transform="rotate(-62.04)"
                        id="rect59-3-78" />
                </g>
                <g id="nashville-atlanta:0:grey:1" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="219.8" y="-35.12" transform="rotate(36.65)"
                        id="rect59-3-819" />
                </g>
                <g id="little_rock-nashville:0:white:3" className="white" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="67.99" y="204" transform="rotate(-40.88)"
                        id="rect59-3-905" />
                    <rect width="8.991" height="3.175" x="117" y="174.3" transform="rotate(-23.41)"
                        id="rect59-3-44" />
                    <rect width="8.991" height="3.175" x="163.8" y="120.1" transform="rotate(-2.069)"
                        id="rect59-3-09" />
                </g>
                <g id="nashville-raleigh:0:black:3" className="black" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="112.1" y="187.7" transform="rotate(-31.98)"
                        id="rect59-3-444" />
                    <rect width="8.991" height="3.175" x="183.2" y="129.3" transform="rotate(-10.36)"
                        id="rect59-3-652" />
                    <rect width="8.991" height="3.175" x="214.3" y="89.44" transform="rotate(0.8127)"
                        id="rect59-3-255" />
                </g>
                <g id="toronto-montreal:0:grey:3" className="grey" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="68.99" y="200.4" transform="rotate(-59.97)"
                        id="rect59-3-9" />
                    <rect width="8.991" height="3.175" x="143.2" y="161.2" transform="rotate(-39.89)"
                        id="rect59-3-5" />
                    <rect width="8.991" height="3.175" x="194.2" y="107.9" transform="rotate(-22.5)"
                        id="rect59-3-60" />
                </g>
                <g id="sault_st_marie-montreal:0:black:5" className="black" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="114.2" y="148.5" transform="rotate(-41.53)"
                        id="rect59-3-0" />
                    <rect width="8.991" height="3.175" x="153.9" y="116.9" transform="rotate(-28.63)"
                        id="rect59-3-7" />
                    <rect width="8.991" height="3.175" x="184.3" y="80.48" transform="rotate(-16.74)"
                        id="rect59-3-3" />
                    <rect width="8.991" height="3.175" x="202.5" y="54.94" transform="rotate(-9.383)"
                        id="rect59-3-6" />
                    <rect width="8.991" height="3.175" x="217.6" y="27.23" transform="rotate(-2.069)"
                        id="rect59-3-8" />
                </g>
                <g id="calgary-winnipeg:0:white:6" className="white" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="50.34" y="45.71" transform="rotate(-24.12)"
                        id="rect59-3-85" />
                    <rect width="8.991" height="3.175" x="68.78" y="31.09" transform="rotate(-11.17)"
                        id="rect59-3-11" />
                    <rect width="8.991" height="3.175" x="82.53" y="17.68" transform="rotate(-1.638)"
                        id="rect59-3-356" />
                    <rect width="8.991" height="3.175" x="92.94" y="13.17" transform="rotate(1.313)"
                        id="rect59-3-668" />
                    <rect width="8.991" height="3.175" x="102.7" y="-12.4" transform="rotate(15.63)"
                        id="rect59-3-076" />
                    <rect width="8.991" height="3.175" x="108.6" y="-30.93" transform="rotate(25.38)"
                        id="rect59-3-45" />
                </g>
                <g id="duluth-chicago:0:red:3" className="red" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="159.5" y="-32.63" transform="rotate(31.94)"
                        id="rect59-3-817" />
                    <rect width="8.991" height="3.175" x="171.6" y="-3.788" transform="rotate(22.1)"
                        id="rect59-3-009" />
                    <rect width="8.991" height="3.175" x="179.5" y="21.96" transform="rotate(13.89)"
                        id="rect59-3-980" />
                </g>
                <g id="omaha-chicago:0:blue:4" className="blue" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="178.2" y="43.16" transform="rotate(8.553)"
                        id="rect59-3-57" />
                    <rect width="8.991" height="3.175" x="166.9" y="49.24" transform="rotate(6.513)"
                        id="rect59-3-248" />
                    <rect width="8.991" height="3.175" x="82.81" y="146.3" transform="rotate(-34.71)"
                        id="rect59-3-683" />
                    <rect width="8.991" height="3.175" x="72.39" y="146.9" transform="rotate(-35.12)"
                        id="rect59-3-58" />
                </g>
                <g id="chicago-pittsburgh" onClick={claimRoute}>
                    <g id="chicago-pittsburgh:0:orange:3" className="orange">
                        <rect width="8.991" height="3.175" x="159.9" y="110.9" transform="rotate(-14.8)"
                            id="rect59-3-40" />
                        <rect width="8.991" height="3.175" x="185.8" y="80.81" transform="rotate(-5.144)"
                            id="rect59-3-066" />
                        <rect width="8.991" height="3.175" x="203.4" y="57.92" transform="rotate(1.315)"
                            id="rect59-3-907" />
                    </g>
                    <g id="chicago-pittsburgh:1:black:3" transform="translate(1.138,3.628)"
                        className="black">
                        <rect width="8.991" height="3.175" x="159.9" y="110.9" transform="rotate(-14.8)"
                            id="rect59-3-40-3" />
                        <rect width="8.991" height="3.175" x="185.8" y="80.81" transform="rotate(-5.144)"
                            id="rect59-3-066-4" />
                        <rect width="8.991" height="3.175" x="203.4" y="57.92" transform="rotate(1.315)"
                            id="rect59-3-907-5" />
                    </g>
                </g>
                <g id="helena-winnipeg:0:blue:4" className="blue" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="28.65" y="100.7" transform="rotate(-43.85)"
                        id="rect59-3-350" />
                    <rect width="8.991" height="3.175" x="37.97" y="100.6" transform="rotate(-43.85)"
                        id="rect59-3-350-8" />
                    <rect width="8.991" height="3.175" x="47.46" y="100.4" transform="rotate(-43.85)"
                        id="rect59-3-350-86" />
                    <rect width="8.991" height="3.175" x="56.8" y="100.2" transform="rotate(-43.85)"
                        id="rect59-3-350-88" />
                </g>
                <g id="las_vegas-salt_lake_city:0:orange:3" className="orange" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="-39.97" y="122.9" transform="rotate(-44.22)"
                        id="rect59-3-926" />
                    <rect width="8.991" height="3.175" x="-72.06" y="104.2" transform="rotate(-64.76)"
                        id="rect59-3-46" />
                    <rect width="8.991" height="3.175" x="-96.27" y="74.61" transform="rotate(-85.81)"
                        id="rect59-3-02" />
                </g>
                <g id="denver-omaha:0:pink:4" className="pink" onClick={claimRoute}>
                    <rect width="8.991" height="3.175" x="27.95" y="137.3" transform="rotate(-36.71)"
                        id="rect59-3-288" />
                    <rect width="8.991" height="3.175" x="62.94" y="127.7" transform="rotate(-25.84)"
                        id="rect59-3-464" />
                    <rect width="8.991" height="3.175" x="87.43" y="118.1" transform="rotate(-18.88)"
                        id="rect59-3-97" />
                    <rect width="8.991" height="3.175" x="113.8" y="102.5" transform="rotate(-10.22)"
                        id="rect59-3-07" />
                </g>
                <g id="denver-kansas_city" onClick={claimRoute}>
                    <g id="denver-kansas_city:0:black:4" className="black">
                        <rect width="8.991" height="3.175" x="112.9" y="89.91" transform="rotate(3.077)"
                            id="rect59-3-911" />
                        <rect width="8.991" height="3.175" x="113.7" y="100.4" transform="rotate(-2.069)"
                            id="rect59-3-802" />
                        <rect width="8.991" height="3.175" x="108.9" y="114.8" transform="rotate(-9.357)"
                            id="rect59-3-485" />
                        <rect width="8.991" height="3.175" x="82.77" y="142.2" transform="rotate(-24.94)"
                            id="rect59-3-360" />
                    </g>
                    <g id="denver-kansas_city:1:orange:4" transform="translate(0.4653,3.433)"
                        className="orange">
                        <rect width="8.991" height="3.175" x="112.9" y="89.91" transform="rotate(3.077)"
                            id="rect59-3-911-3" />
                        <rect width="8.991" height="3.175" x="113.7" y="100.4" transform="rotate(-2.069)"
                            id="rect59-3-802-5" />
                        <rect width="8.991" height="3.175" x="108.9" y="114.8" transform="rotate(-9.357)"
                            id="rect59-3-485-0" />
                        <rect width="8.991" height="3.175" x="82.77" y="142.2" transform="rotate(-24.94)"
                            id="rect59-3-360-7" />
                    </g>
                </g>
                <g id="new_orleans-atlanta" onClick={claimRoute}>
                    <g id="new_orleans-atlanta:0:yellow :4" className="yellow ">
                        <rect width="8.991" height="3.175" x="-72.03" y="218.4" transform="rotate(-70.21)"
                            id="rect59-3-510" />
                        <rect width="8.991" height="3.175" x="-11.3" y="227.1" transform="rotate(-57.14)"
                            id="rect59-3-10" />
                        <rect width="8.991" height="3.175" x="23.81" y="226" transform="rotate(-50.77)"
                            id="rect59-3-99" />
                        <rect width="8.991" height="3.175" x="68.78" y="218.2" transform="rotate(-41.71)"
                            id="rect59-3-043" />
                    </g>
                    <g id="new_orleans-atlanta:1:red:4" transform="translate(2.497,2.551)" className="red">
                        <rect width="8.991" height="3.175" x="-72.03" y="218.4" transform="rotate(-70.21)"
                            id="rect59-3-510-4" />
                        <rect width="8.991" height="3.175" x="-11.3" y="227.1" transform="rotate(-57.14)"
                            id="rect59-3-10-9" />
                        <rect width="8.991" height="3.175" x="23.81" y="226" transform="rotate(-50.77)"
                            id="rect59-3-99-6" />
                        <rect width="8.991" height="3.175" x="68.78" y="218.2" transform="rotate(-41.71)"
                            id="rect59-3-043-2" />
                    </g>
                </g>
                <g id="san_francisco-portland" onClick={claimRoute}>
                    <g id="san_francisco-portland:0:green:5" className="green">
                        <rect width="8.991" height="3.175" x="47.27" y="-39.45" transform="rotate(109.7)"
                            id="rect59-3-17" />
                        <rect width="8.991" height="3.175" x="-71.03" y="25.7" transform="rotate(-79.89)"
                            id="rect59-3-918" />
                        <rect width="8.991" height="3.175" x="74.86" y="-16.78" transform="rotate(90.65)"
                            id="rect59-3-82" />
                        <rect width="8.991" height="3.175" x="-94.42" y="5.309" transform="rotate(-94.67)"
                            id="rect59-3-045" />
                        <rect width="8.991" height="3.175" x="93.82" y="14.41" transform="rotate(71.61)"
                            id="rect59-3-500" />
                    </g>
                    <g id="san_francisco-portland:1:pink:5" transform="translate(3.605,-0.1105)"
                        className="pink">
                        <rect width="8.991" height="3.175" x="47.27" y="-39.45" transform="rotate(109.7)"
                            id="rect59-3-17-0" />
                        <rect width="8.991" height="3.175" x="-71.03" y="25.7" transform="rotate(-79.89)"
                            id="rect59-3-918-9" />
                        <rect width="8.991" height="3.175" x="74.86" y="-16.78" transform="rotate(90.65)"
                            id="rect59-3-82-6" />
                        <rect width="8.991" height="3.175" x="-94.42" y="5.309" transform="rotate(-94.67)"
                            id="rect59-3-045-6" />
                        <rect width="8.991" height="3.175" x="93.82" y="14.41" transform="rotate(71.61)"
                            id="rect59-3-500-9" />
                    </g>
                </g>
                <g id="san_francisco-los_angeles" onClick={claimRoute}>
                    <g id="san_francisco-los_angeles:0:yellow:3" transform="translate(0,-0.0692)"
                        className="yellow">
                        <rect width="8.991" height="3.175" x="-116.2" y="-30.54" transform="rotate(-114.8)"
                            id="rect59-3-647" />
                        <rect width="8.991" height="3.175" x="110" y="46.54" transform="rotate(55.48)"
                            id="rect59-3-742" />
                        <rect width="8.991" height="3.175" x="110.2" y="65.25" transform="rotate(46.21)"
                            id="rect59-3-086" />
                    </g>
                    <g id="san_francisco-los_angeles:1:pink:3" transform="translate(3.082,-1.648)"
                        className="pink">
                        <rect width="8.991" height="3.175" x="-116.2" y="-30.54" transform="rotate(-114.8)"
                            id="rect59-3-647-0" />
                        <rect width="8.991" height="3.175" x="110" y="46.54" transform="rotate(55.48)"
                            id="rect59-3-742-1" />
                        <rect width="8.991" height="3.175" x="110.2" y="65.25" transform="rotate(46.21)"
                            id="rect59-3-086-4" />
                    </g>
                </g>
            </g>
            <g id="Labels" />
        </svg>
    )
};