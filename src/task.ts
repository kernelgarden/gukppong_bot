import { isNullOrUndefined } from "util";
import { Cancelable } from "./cancelable";

export class Task implements Cancelable {
    protected job: () => Promise<any>;
    protected _execute_time: number;
    protected is_expirated: boolean;

    get execute_time(): number {
        return this._execute_time;
    }

    constructor(job: () => Promise<any>, executeTime: number) {
        this.job = job;
        this._execute_time = executeTime;
        this.is_expirated = false;
    }

    public execute(): boolean {
        if (isNullOrUndefined(this.job) || this.is_expirated == true) {
            return false;
        } else {
            // 비동기 작업을 수행하지만 대기하지는 않는다.
            this.job();
            return true;
        }
    }

    public cancel(): void {
        // Priority Queue 기반으로 스케줄러가 동작하기 때문에 마킹만 해두는 방식으로 쓴다.
        this.is_expirated = true;
    }

    public static comparator(lhs: Task, rhs: Task): number {
        return lhs.execute_time - rhs.execute_time;
    }
}