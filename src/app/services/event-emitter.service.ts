import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventEmiterService {

    notificationsCount = new EventEmitter();
    responseCount = new EventEmitter();

    sendNotificationCount(data: number) {
        this.notificationsCount.emit(data);
    }

    sendResponseCount(data: number) {
        this.responseCount.emit(data);
    }
}