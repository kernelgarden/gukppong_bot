export class ObjectPool<T> {

}

export interface IPoolable {
    Init: InitFunc
}

export type InitFunc = () => {}