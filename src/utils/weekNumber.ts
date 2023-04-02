interface SemanasMethods {
  weekNumOfDate: Readonly<number>;
  semana: Readonly<0 | 1>;
  today: Readonly<Date>;
  yy: Readonly<number>;
  mm: Readonly<number>;
  dd: Readonly<number>;
  pegarDataAtual(): 0 | 1;
  getWeekNumOfMonthOfDate(d: Date): number;
  verificaSeaSemanaEimpar(data: number): 0 | 1;
}

class Semanas implements SemanasMethods {
  readonly weekNumOfDate: number;
  readonly semana: 0 | 1;
  readonly today = new Date();
  readonly yy = this.today.getFullYear();
  readonly mm = this.today.getMonth();
  readonly dd = this.today.getDate();

  constructor() {
    this.weekNumOfDate = this.getWeekNumOfMonthOfDate(
      new Date(this.yy, this.mm, this.dd),
    );
    this.semana = this.verificaSeaSemanaEimpar(this.weekNumOfDate);
    this.pegarDataAtual();
  }

  getWeekNumOfMonthOfDate(d: Date): number {
    const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil(
      ((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7,
    );
    if (week === 22) {
      return week;
    }
    return week + 1;
  }

  pegarDataAtual(): 0 | 1 {
    return this.semana;
  }

  verificaSeaSemanaEimpar(data: number): 0 | 1 {
    if (data % 2 === 0) {
      return 0;
    }
    return 1;
  }
}
export default Semanas;
