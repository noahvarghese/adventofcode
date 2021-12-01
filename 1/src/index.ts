import { getLines } from "@util/file";
import Logs from "@util/logs";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const INPUT_FILE = "./data/input.txt";

(async () => {
    Logs.configureLogs(false);

    const converter = (val: string) => Number(val);
    const validator = (val: string) => {
        if (isNaN(converter(val))) {
            throw new Error("Invalid depth");
        }

        return true;
    };

    const readings = await getLines<number>(INPUT_FILE, converter, validator);
    let counter = 0;

    if (readings.length < 2) {
        Logs.Result(counter);
        return;
    }

    for (let i = 1; i < readings.length; i++) {
        const previousDepth = readings[i - 1];
        const currentDepth = readings[i];

        if (currentDepth > previousDepth) {
            counter++;
        }
    }

    Logs.Result(counter);
})();
