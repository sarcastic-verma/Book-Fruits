class RequestError extends Error {
    constructor(message, errorCode, err) {
        super(message);
        this.code = errorCode;

        // If err is passed, it will be logged on the console
        if (err) {
            console.log("\n")
            const currentDate = new Date();
            const datetime = currentDate.getDate() + "/"
                + (currentDate.getMonth() + 1) + "/"
                + currentDate.getFullYear() + " @ "
                + currentDate.getHours() + ":"
                + currentDate.getMinutes() + ":"
                + currentDate.getSeconds();
            console.log(`The following error occurred on ${datetime}:`);
            console.log(err);
            console.log("\n")
        }
    }
}

module.exports = RequestError;