import { Peer } from 'peerjs'

export let peer = undefined as Peer | undefined;

export default function initPeer() {
    peer = new Peer();

    peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
    });
}