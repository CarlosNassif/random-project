import { Component, OnInit, ɵConsole } from '@angular/core';
import { Target } from 'src/app/classes/target';

@Component({
  selector: 'app-aim-training',
  templateUrl: './aim-training.page.html',
  styleUrls: ['./aim-training.page.scss'],
})
export class AimTrainingPage implements OnInit {
  targets: Target[] = [];

  training: boolean = false;

  delay: number = 500;
  minDiam: number = 20;
  maxDiam: number = 50;
  targetToKill: number = 20;
  targetNumber: number = this.targetToKill;

  score: number = 0;

  constructor() {}

  ngOnInit() {}

  async generateTargets() {
    while (this.training && this.targetNumber >= 0) {
      // console.log('Target Created!');
      const diam = getRandomArbitrary(this.minDiam, this.maxDiam);
      const y = getRandomArbitrary(100 + diam, window.innerHeight - diam * 4);
      const x = getRandomArbitrary(0 + diam, window.innerWidth - diam * 4);
      const id = getRandomArbitrary(0, 2000).toString();
      const target: Target = {
        id,
        pos: { x, y },
        diam,
      };
      this.targets.push(target);
      // console.log(this.targets);
      await pause(this.delay);
      const element = document.getElementById(id);
      element.style.cssText = `
      visibility: visible;
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      height: ${diam}px;
      width: ${diam}px;
      border-radius: ${diam}px;
      background: wheat;
      outline: none;
      `;
    }
  }

  remove($event: MouseEvent, i: number) {
    // console.log('event', $event);
    const clickX: number = $event.clientX;
    const clickY: number = $event.clientY;

    const target = this.targets[i];
    target.pos.x += target.diam / 2;
    target.pos.y += target.diam;

    const error: number =
      Math.sqrt((target.pos.x - clickX) ** 2 + (target.pos.y - clickY) ** 2) /
      (target.diam / 2);

    this.score += Math.floor(
      Number((target.diam / error).toPrecision(2)) * 100
    );
    // console.log('pos:', target.pos);
    // console.log('click:', { x: clickX, y: clickY });

    // console.log('error:', error);

    this.targets.splice(i, 1);

    console.log('Your score:', this.score);
    this.targetNumber--;
  }

  toggleTraining() {
    if (this.training) {
      this.training = false;
    } else {
      this.training = true;
      this.targetNumber = this.targetToKill;
      this.generateTargets();
    }
  }
}

// https://stackoverflow.com/questions/51633328/how-to-pause-a-function-in-typescript
function pause(timeInMillis: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
}

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
