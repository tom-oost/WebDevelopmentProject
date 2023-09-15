class GDPR {

    constructor() {
        this.bindEvents();
        if(this.getCookie("gdpr-consent-choice") !== 'accept') this.showGDPR();
    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.setCookie("gdpr-consent-choice","accept");
            this.hideGDPR();
        });

        let buttonReject = document.querySelector('.gdpr-consent__button--reject');
        buttonReject.addEventListener('click', () => {
            this.setCookie("gdpr-consent-choice","reject");
            this.hideGDPR();
        });
    }

    setCookie(ItemName, value) {
        document.cookie = ItemName + "=" + value + ";" + 2592000 + ";path=/";
    }

     getCookie(ItemName) {
        let cookieArr = document.cookie.split(";");
        for(let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");
            if(ItemName == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }

    checkCookie(ItemName, WantedResult) {
        let UserName = getCookie(ItemName);
        if(ItemName != WantedResult) {
            return false;
        } else {
            return true;
        }
    }

    hideGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('hide');
        document.querySelector(`.gdpr-consent`).classList.remove('show');
    }

    showGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('show');
    }


}

const gdpr = new GDPR();

