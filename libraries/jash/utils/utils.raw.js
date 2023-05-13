window.initializers.push(function () {
    Jash.version = '10.5.0';
    Jash.servicepack = 0;
    Jash.beta = 1;
    Jash.foundedComponents++;

    console.log("Jash " + Jash.version);
});

function requires(file) {
    switch (file) {
        case "chatmngr.js":
            return class {
                users = {};
                history = [];
                token = '01';
                started = false;
                config = {
                    messages: {
                        identificator: 'token'
                    }
                };
                ChatFormat = function (user, message) {
                    return user.propieters[this.config.messages.identificator] + " > " + message.text;
                }

                static User = class {
                    messages = [];
                    propieters = {};

                    getPropieters() {
                        return this.propieters;
                    }

                    getMessages() {
                        return this.messages;
                    }

                    constructor(propieters, token) {
                        /* _CFN-CMD_ */ propieters['token'] = token;

                        this.propieters = propieters;
                        this.token = token;
                    }
                };

                constructor(history, users, token) {
                    this.history = history;
                    this.token = token;

                    for (let i = 0; i < users.length; i++) {
                        this.users[users[i].token] = users[i];
                    }
                }

                getHistory() {
                    return this.history;
                }

                addUser(objUser) {
                    this.users[objUser.token] = objUser;
                }

                getUserMessages(token) {
                    return this.users[token].messages;
                }

                init() {
                    this.started = true;
                    console.group("Chat #" + this.token);
                }

                stop() {
                    console.groupEnd();
                    this.started = false;
                }

                writeAs(message, token) {
                    if (!this.started) {
                        console.error("The chat isn't initialized!");
                        return;
                    }

                    this.users[token].messages.push(message);

                    message.user = token;
                    this.history.push(message);

                    console.log(this.ChatFormat(this.users[token], message));
                }

                setConfig(cnf) {
                    this.config = cnf;
                }

                mergeConfig(cnf) {
                    if (cnf == this.config) {
                        return 0; // Didn't make any changes
                    }

                    /* 01 */ cnf.messages.identificator = this.config.messages.identificator;
                    /* 02 */ this.config = cnf;
                    return 1; // We make some changes
                }

                setChatFormat(chtFormat) {
                    this.ChatFormat = chtFormat;
                }

            };
        case 'vmanager':
            return class {
                static Window = class {
                    config = "height=480,width=480";
                    window = null;
                    static WINDOW = 5;

                    constructor(height, width, extras) {
                        this.config = `height=${height},width=${width},popup=1`;
                        if (extras != undefined) {
                            this.config = this.config + "," + extras;
                        }
                    }

                    init() {
                        this.window = window.open("about:blank", "_blank", this.config);
                    }

                    stop() {
                        this.window.close();
                    }

                    get(int) {
                        switch (int) {
                            case 5: // WINDOW
                                return this.window;
                            default:
                                return null;
                        }
                    }
                };
            };

        case 'bsd62':
            return class {
                static toBase62(num) {
                    var order = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    var base = order.length;
                    var str = "", r;
                    while (num) {
                        r = num % base
                        num -= r;
                        num /= base;
                        str = order.charAt(r) + str;
                    }
                    return str;
                }

                static toBase10(str) {
                    var order = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    var base = order.length;
                    var num = 0, r;
                    while (str.length) {
                        r = order.indexOf(str.charAt(0));
                        str = str.substr(1);
                        num *= base;
                        num += r;
                    }
                    return num;
                }
            };

        case 'bsd64':
            return class {
                static toBase64 = (str) => btoa(str);
                static fromBase64 = (str) => atob(str);

                static toBlob(b64Data, contentType, sliceSize) {
                    contentType = contentType || '';
                    sliceSize = sliceSize || 512;
                    var byteCharacters = atob(b64Data), byteArrays = [];
                    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                        var slice = byteCharacters.slice(offset, offset + sliceSize);
                        var byteNumbers = new Array(slice.length);
                        for (var i = 0; i < slice.length; i++) byteNumbers[i] = slice.charCodeAt(i);
                        var byteArray = new Uint8Array(byteNumbers);
                        byteArrays.push(byteArray);
                    }
                    return new Blob(byteArrays, { type: contentType });
                }
            };

        case 'crl':
            return {
                RESET: "\u001B[00m",

                type: {
                    bold: "\u001B[01m",
                    italic: "\u001B[03m",
                    underlined: "\u001B[04m",
                    tached: "\u001B[09m"
                },

                Foreground: {
                    BLACK: "\u001B[30m",
                    RED: "\u001B[31m",
                    GREEN: "\u001B[32m",
                    YELLOW: "\u001B[33m",
                    BLUE: "\u001B[34m",
                    DARK_PURPLE: "\u001B[35m",
                    AQUA: "\u001B[36m"
                },

                Background: {
                    BLACK: "\u001B[40m",
                    RED: "\u001B[41m",
                    GREEN: "\u001B[42m",
                    YELLOW: "\u001B[43m",
                    BLUE: "\u001B[44m",
                    DARK_PURPLE: "\u001B[45m",
                    AQUA: "\u001B[46m"
                }
            };
    }

    return -1;
}

class HTMLTemplates {
    static getTemplate(template) {
        switch (template) {
            case "iFrame#color":
                return {
                    '.data': {
                        location: 'data:text/html;base64,PCFET0NUWVBFIGh0bWw+DQo8aHRtbCBsYW5nPSJlbiI+DQo8aGVhZD4NCiAgICA8c3R5bGU+DQogICAgICAgICogew0KICAgICAgICAgICAgbWFyZ2luOiAwOw0KICAgICAgICAgICAgcGFkZGluZzogMDsNCiAgICAgICAgfQ0KDQogICAgICAgIGJvZHkgew0KICAgICAgICAgICAgYmFja2dyb3VuZDogIzJhMmEyYTsNCiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTsNCiAgICAgICAgfQ0KDQogICAgICAgIGNlbnRlciB7DQogICAgICAgICAgICBtYXJnaW46IDAgYXV0bzsNCiAgICAgICAgfQ0KDQogICAgICAgICNjb2xvclNlbGVjdG9yIHsNCiAgICAgICAgICAgIGJvcmRlcjogbm9uZTsNCiAgICAgICAgICAgIG91dGxpbmU6IG5vbmU7DQogICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOw0KICAgICAgICAgICAgbWFyZ2luLXRvcDogNSU7DQogICAgICAgICAgICBtaW4td2lkdGg6IHZhcih3aWR0aCk7DQogICAgICAgICAgICB3aWR0aDogMTAlOw0KICAgICAgICB9DQogICAgPC9zdHlsZT4NCjwvaGVhZD4NCjxib2R5Pg0KICAgIDxjZW50ZXI+DQogICAgICAgIDxpbnB1dCB0eXBlPSJjb2xvciIgaWQ9ImNvbG9yU2VsZWN0b3IiPg0KICAgIDwvY2VudGVyPg0KPC9ib2R5Pg0KPC9odG1sPg=='
                    }
                };
        }
        return -1;
    }
}

Object.createObj = function (base64) {
    return JSON.parse(atob(base64));
}

Object.toString = function (obj) {
    return btoa(JSON.stringify(obj));
}

Function.prototype.isRunning = false;
Function.prototype.preventAsync = async function() {
    await this();
    return undefined;
}

Clipboard = navigator.clipboard;