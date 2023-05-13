class Jandriax {
    static loaded = false;

    static mark(status) {
        switch (status) {
            case 'loaded':
                this.loaded = true;
                break;
            case 'unloaded':
                this.loaded = false;
                break;
        }
    }

    static getStatus() {
        return this.loaded;
    }
}

function load() {
    let jComponents = document.getElementsByTagName("JComponent");
    for (let i = 0; i < jComponents.length; i++) {
        let Component = jComponents[i];
        Component.data = {
            type: Component.getAttribute("type"),
            source: Component.getAttribute("src")
        };

        switch (Component.data['type']) {
            case 'applet':
                processGraphixs(Component);
                break;
        }
    }



    Jandriax.mark('loaded');
}

function reload() {
    if (Jandriax.getStatus() == true) {
        load();
        return 0;
    }

    return -1;
}

class Graphixs {

    static async processGraphixs(  HTMLObj  ) {

        let source = HTMLObj.data['source'];
        const blob = await fetch(source).then((data) => data.blob());
        const Code = blob.text();

        var Canvas = document.createElement("div");
        HTMLObj.appendChild(Canvas);

        Canvas.classList.add('cVn1Applet'); // Identifier for the canvas

        /* Customize */
        HTMLObj.style.height = "350px";
        HTMLObj.style.width = "350px";
        Canvas.style.position = "fixed";
        Canvas.style.height = "100%";
        Canvas.style.width = "100%";
        Canvas.style.backgroundColor = "#A5A1A1";
        this.setAnimation(Canvas);

    }

    static setAnimation(  HTMLObj  ) {
        HTMLObj.style.backgroundImage = "url('')"

        setTimeout(function() {

        }, 5000);

        return 0;
    }
}