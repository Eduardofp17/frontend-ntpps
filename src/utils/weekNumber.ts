class Semanas {
  static getWeekNumOfDate(d: Date): number {
    const onejan = new Date(d.getFullYear(), 0, 1);
    const daysInYear = Math.floor(
      (d.getTime() - onejan.getTime()) / (24 * 60 * 60 * 1000),
    );
    const weekNum = Math.ceil((daysInYear + onejan.getDay() + 1) / 7);
    return weekNum;
  }

  static isOdd(number: number): boolean {
    return number % 2 !== 0;
  }

  static pegarDataAtual(): number {
    const today: Date = new Date();
    const weekNumOfDate: number = this.getWeekNumOfDate(today);
    const semana: number = this.isOdd(weekNumOfDate) ? 1 : 0;
    return semana;
  }
}

export default Semanas;
