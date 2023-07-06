//Gestion des etoiles
eventChangeStar("field_responsive");
eventChangeStar("field_code");
eventChangeStar("field_integration");
eventChangeStar("field_vertu");

function eventChangeStar(field_name) {

    totalField = 0;

    var field = document.querySelectorAll('input[name="'+ field_name +'"]');
    for (let i = 0; i < field.length; i++) {

        field[i].addEventListener("change", function() {
            let val = parseInt(this.value); 

           this.style.setProperty('--starColor', 'orange');

            totalField = val;
            let startMap = [4, 3, 2, 1, 0];

            for (let a = 0; a < 5; a++) {
                 var position = totalField-1;
                if(startMap[a] <= (position)) {
                    field[a].style.setProperty('--starColor', 'orange');
                }
                else field[a].style.setProperty('--starColor', '#eee');
            }

            displayTotal();

            return totalField;
        });
    }

    return totalField;
}

function returnStarValue(field_name) {

    checked = false;
    value = 0;

    var field = document.querySelectorAll('input[name="'+ field_name +'"]');
    for (let i = 0; i < field.length; i++) {
        if(field[i].checked) {
            checked = true;
            let val = parseInt(field[i].value); 
            value = val;
        }
    }

    return {
        'checked' : checked,
        'value'   : value,
    };
}

function displayTotal() {

    var radioStar1 = returnStarValue('field_responsive');
    var radioStar2 = returnStarValue('field_code');
    var radioStar3 = returnStarValue('field_integration');
    var radioStar4 = returnStarValue('field_vertu');

    var total = radioStar1.value+radioStar2.value+radioStar3.value+radioStar4.value;

    if(radioStar1.checked && radioStar2.checked && radioStar3.checked && radioStar4.checked) {
        totalStar = (total/4).toFixed(2);
        totalStarCeil = Math.ceil(totalStar);
        totalStarInt = parseInt(totalStar);
        decimalStar = (totalStar % 1).toFixed(2);
        originalWidth = 36;

        if(decimalStar > 0) {
            starWidth= parseInt(originalWidth*decimalStar);
        }
        else starWidth = originalWidth;

        document.getElementById("formResult").style.display = "block";
        document.getElementById("star"+totalStarInt).classList.add("active");

        for (let a = 1; a <= 5; a++) {
            if(a <= totalStarCeil) {
                star = document.getElementById("star"+a);
                star.classList.add("active");

                if(totalStarCeil == a) {
                    star.style.setProperty('--starTotalWidth', starWidth+'px');
                }
                else star.style.setProperty('--starTotalWidth', '36px');
            
            }
            else document.getElementById("star"+a).classList.remove("active");
        }
    }
    else {
        document.getElementById("formResult").style.display = "none";
        for (let a = 1; a <= 5; a++) {
            document.getElementById("star"+a).classList.remove("active");
        }
    }
}






