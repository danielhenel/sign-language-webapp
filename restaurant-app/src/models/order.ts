export class Order {
  constructor(
    public id: number,
    public userId: number,
    public date: string,
    public dishes: Map<number, number>,
    public total: number,
  ){}
}
