import {IMessage} from "./types";
import {Weather} from "../../image-sources";

export class ActiveComponentChangedMessage implements IMessage {
    constructor(public componentName: string, public state: boolean) {
    }
}

export class WeatherMessage implements IMessage {
    constructor(public weather: Weather) {
    }
}

export class ForceUpdateWeatherMessage implements IMessage {
    constructor() {
    }
}

export class BottomBarRequestUpdateMessage implements IMessage {
    constructor() {
    }
}

export class ShowTransportationMessage implements IMessage {
    constructor() {
    }
}

export class FetchNextImageMessage implements IMessage {
    constructor() {
    }
}
