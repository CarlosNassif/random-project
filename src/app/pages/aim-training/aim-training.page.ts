import { Component, OnInit, ɵConsole } from '@angular/core';
import { Target } from 'src/app/classes/target';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-aim-training',
  templateUrl: './aim-training.page.html',
  styleUrls: ['./aim-training.page.scss'],
})
export class AimTrainingPage implements OnInit {
  targets: Target[] = [];

  training: boolean = false;

  delay: number;
  diam: number;
  targetsToKill: number;
  targetsNumber: number;

  score: number = 0;
  scoreAdd: number;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    // const c = await this.loadingController.create();
    // c.present();
    // await pause(500);
    // c.dismiss();
    this.showMenu();
  }

  async generateTargets() {
    while (this.training && this.targetsNumber >= 0) {
      // console.log('Target Created!');
      const diam = this.diam;
      const y = getRandomArbitrary(100 + diam, window.innerHeight - diam * 4);
      const x = getRandomArbitrary(0 + diam, window.innerWidth - diam * 4);
      const id = getRandomArbitrary(0, 2000).toString();
      const target: Target = {
        id,
        pos: { x, y },
        diam,
        born: Date.now() + this.delay,
      };
      this.targets.push(target);
      // console.log(this.targets);
      await pause(this.delay);
      const element = document.getElementById(id);
      element.style.cssText += `
      visibility: visible;
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      height: ${diam}px;
      width: ${diam}px;
      border-radius: ${diam}px;
      outline: none;
      `;
      this.targetsNumber--;
      setTimeout(() => {
        this.targets.shift();
      }, this.delay * 2);
    }
    this.training = false;
    await pause(this.delay);
    this.showScore();
  }

  remove($event: MouseEvent, i: number) {
    // console.log('event', $event);
    const clickX: number = $event.clientX;
    const clickY: number = $event.clientY;

    const target = this.targets[i];
    console.log('pos:', target.pos);
    target.pos.x += target.diam / 2;
    target.pos.y += target.diam;

    const dist: number = Math.sqrt(
      (target.pos.x - clickX) ** 2 + (target.pos.y - clickY) ** 2
    );

    const time: number = Date.now() - target.born;

    console.log('Time:', time);

    const error: number = (dist / (target.diam / 2)) * (time / 1000);

    this.score += Math.min(
      Math.floor(this.scoreAdd / error),
      this.scoreAdd * 10
    );
    // console.log('click:', { x: clickX, y: clickY });
    // console.log('pos:', target.pos);

    // console.log('error:', error);
    // this.targets.splice(i, 1);

    document.getElementById(target.id).style.cssText = 'visibility: hidden;';

    // console.log('Your score:', this.score);
  }

  toggleTraining() {
    if (this.training) {
      this.training = false;
    } else {
      this.training = true;
      this.targets = [];
      this.score = 0;
      this.targetsNumber = this.targetsToKill;
      this.generateTargets();
    }
  }

  showMenu() {
    this.alertController
      .create({
        header: 'Difficulty',
        buttons: [
          {
            text: 'WARM UP',
            handler: this.warmUp.bind(this),
          },
          {
            text: 'HARD',
            handler: this.hardMode.bind(this),
          },
          {
            text: 'NORMAL',
            handler: this.normalMode.bind(this),
          },
          {
            text: 'EASY',
            handler: this.easyMode.bind(this),
          },
        ],
      })
      .then((e) => e.present());
  }

  showScore() {
    this.alertController
      .create({
        header: 'Your Score:',
        message: this.score.toString(),
        buttons: [
          {
            text: 'NICE',
          },
          {
            text: 'TRY AGAIN',
            handler: this.toggleTraining.bind(this),
          },
        ],
      })
      .then((e) => e.present());
  }

  easyMode() {
    this.setValues(1500, 70, 10, 10);
  }

  normalMode() {
    this.setValues(1000, 50, 20, 20);
  }

  hardMode() {
    this.setValues(750, 30, 30, 40);
  }

  warmUp() {
    this.setValues(1250, 50, 100, 15);
    setTimeout(() => {
      this.setValues(1000, 45, 100, 20);
      setTimeout(() => {
        this.setValues(750, 40, 100, 40);
        setTimeout(() => {
          this.setValues(500, 40, 100, 100);
        }, 10000);
      }, 10000);
    }, 10000);
  }

  setValues(de: number, di: number, ttk: number, sA: number) {
    this.delay = de;
    this.diam = di;
    this.targetsToKill = ttk;
    this.targetsNumber = ttk;
    this.scoreAdd = sA;
    this.startTraining();
  }

  startTraining() {
    if (this.training) {
      return;
    }
    this.toggleTraining();
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
