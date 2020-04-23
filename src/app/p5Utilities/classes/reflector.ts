import * as p5 from 'p5';

export class Reflector {

    // tslint:disable-next-line: no-string-literal
    AudioContext = window['AudioContext'] || window['webkitAudioContext'];
    private audioCtx = new this.AudioContext();
    private gainNode = this.audioCtx.createGain();
    private hitCount = 0;

    p5Ref = new p5(() => { });
    pos: p5.Vector;

    width: number;
    height: number;
    timesHit = 0;
    private fillColor = '#fff';
    private fillColorArr = ['#fff', '#FF6F61', '#DD4124', '#88B04B', '#92A8D1'];

    constructor(w: number, h: number) {
        this.height = h;
        this.width = w;

    }

    intersected() {
        this.hitCount++;
        let freq;
        switch (this.hitCount) {
            case 1:
                freq = 261.63; // C4
                break;
            case 2:
                freq = 293.66; // D4
                break;
            case 3:
                freq = 311.13; // Eb4
                break;
            case 4:
                freq = 349.23; // F4
                break;
            case 5:
                freq = 392.00; // G4
                break;
            case 6:
                freq = 415.30; // Ab4
                break;
            case 7:
                freq = 466.16; // Bb4
                break;
            default:
                this.hitCount = 0;
                freq = 523.25; // C5
                break;
        }
        const osc = this.audioCtx.createOscillator();
        osc.connect(this.gainNode);
        this.gainNode.gain.value = 0.1;
        this.gainNode.connect(this.audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.start(this.audioCtx.currentTime);
        osc.stop(this.audioCtx.currentTime + 0.18);
        this.fillColor = this.fillColorArr[Math.floor(Math.random() * this.fillColorArr.length)];

    }

    display(sketch) {
        sketch.fill(this.fillColor);
        sketch.noStroke();
        sketch.rect(this.pos.x, this.pos.y, this.width, this.height);
    }
}
