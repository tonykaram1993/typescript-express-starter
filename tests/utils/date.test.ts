// Utils
import dateUtils from "../../src/utils/date.util";

describe("getElapsedTimeInSeconds", () => {
    test("getElapsedTimeInSeconds returns elapsed time in seconds", () => {
        const date = Date.now() - 1000;
        const elapsedTime = dateUtils.getElapsedTimeInSeconds(date);

        expect(elapsedTime).toEqual(1);
    });
});
