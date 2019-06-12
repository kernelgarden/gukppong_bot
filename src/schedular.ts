import PriorityQueue from "js-priority-queue";
import { Task } from "./task";
import { Cancelable } from "./cancelable";

export class Schedular {
    private pq: PriorityQueue<Task>;
    private reserved_timer_handler: NodeJS.Timeout;

    constructor() {
        this.pq = new PriorityQueue({comparator: Task.comparator});
        this.reserved_timer_handler = null;
    }

    public push(job: () => Promise<any>, execute_time: Date): Cancelable {
        const task: Task = new Task(job, execute_time.getTime());
        this.pq.queue(task);
        this.wake_up();
        return task;
    }

    private wake_up() {
        // 스케줄러를 당장 깨운다.
        clearTimeout(this.reserved_timer_handler);
        this.reserved_timer_handler = null;

        const left_time: number = this.get_next_time();
        
        // 당장 할 일이 있는지 체크를 하고 없다면 다시 잔다.
        if (left_time > 0) {
            // 남은 시간 뒤에 깨어나도록 한다.
            this.reserve(left_time);
        } else {
            this.process_jobs()
        }
    }

    private reserve(left_time: number) {
        // 이전에 잡혀있던 핸들러는 취소한다.
        if (this.reserved_timer_handler != null)
            clearTimeout(this.reserved_timer_handler);

        this.reserved_timer_handler = setTimeout(this.wake_up, left_time);
    }

    private process_jobs() {
        while (this.pq.length > 0) {
            let left_time: number = this.get_next_time();
            if (left_time > 0) {
                // 당장 실행 할 수 없다면 예약 후에 종료
                this.reserve(left_time);
                break;
            } else {
                let task: Task = this.pq.dequeue();
                task.execute();
            }
        }
    }

    private get_next_time(): number {
        // 큐가 비어있는 경우엔 엄청 이후의 시간으로 대강 잡아두자
        if (this.pq.length <= 0) {
            return Number.MAX_VALUE;
        }

        let current_time = new Date().getTime();
        let next_time = this.pq.peek().execute_time;

        const left_time: number = next_time - current_time;

        return left_time;
    }
}