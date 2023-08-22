var urlSrv = main_url + 'users/' + user_id + '/'

function ini(arg) {
    console.log(arg)
    var container = document.getElementById("captchaContainer");


    var captchaImagesFolder = urlSrv + "images/answers/";
    var correctImagePrefix = "x_";
    var totalImages = 9;
    var correctAnswers = 4;
    var selectedImages = [];
    var allImages = [];
    var selectedImagesCount = 0


    function generateCaptcha() {
        container.innerHTML = "";

        // Отримуємо список усіх зображень з теки

        // Отримуємо зображення з сервера
        // Ви можете використовувати AJAX запит або використовувати сторонні бібліотеки, такі як fetch або axios,
        // для отримання списку зображень з сервера
        // Нижче наведений приклад для отримання списку зображень з сервера з використанням fetch
        fetch(captchaImagesFolder)
            .then(function (response) {
                return response.text();
                console.log(response.text())
            })
            .then(function (html) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, "text/html");
                var images = doc.querySelectorAll("a");
                images.forEach(function (image) {
                    let cash = image.getAttribute("href")
                    if (cash.includes(".jpg")) {
                        allImages.push(cash);
                    }
                });
                // Вибираємо випадкові зображення для CAPTCHA
                while (selectedImages.length < totalImages) {
                    var randomIndex = Math.floor(Math.random() * allImages.length);
                    var selectedImage = allImages[randomIndex];

                    selectedImages.push(captchaImagesFolder + selectedImage);
                    // if (!selectedImages.includes(selectedImage) && selectedImage.includes(correctImagePrefix)) {
                    //     selectedImages.push(captchaImagesFolder + selectedImage);
                    // }
                }

                // Відображаємо зображення в CAPTCHA
                for (var i = 0; i < selectedImages.length; i++) {
                    var image = document.createElement("img");
                    image.src = selectedImages[i];
                    image.classList.add("captchaImage");
                    image.addEventListener("click", function () {
                        // Перевірити, чи в елементі вже є клас "selected"
                        // console.log(img.getAttribute('src'))
                        if (this.classList.contains("selected")) {
                            // Видалити клас "selected", якщо він вже присутній
                            this.classList.remove("selected");
                            selectedImagesCount--
                        } else {
                            // Додати клас "selected", якщо його немає
                            this.classList.add("selected");
                            selectedImagesCount++
                        }
                        console.log(selectedImagesCount)
                    });
                    container.appendChild(image);
                }
            });
    }

    // Генеруємо CAPTCHA при завантаженні сторінки
    generateCaptcha();
    const checkBtn = document.getElementById("checkBtn")
    checkBtn.addEventListener("click", function () {
        checkCaptcha()
    })

    function checkCaptcha() {
        var countChoose = 0
        var res = false
        var selectedElements = document.querySelectorAll("#captchaContainer img");
        for (var i = 0; i < selectedElements.length; i++) {
            console.log(i)
            console.log(selectedElements[i].classList.contains("selected"))
            console.log(selectedElements[i].getAttribute("src").includes(correctImagePrefix))
            if (selectedElements[i].classList.contains("selected") && selectedElements[i].getAttribute("src").includes(correctImagePrefix)) {
                countChoose++
                console.log(countChoose)
            }
        }
        // Виводимо результати
        var result = "Невірна CAPTCHA. Спробуйте ще раз.";
        console.log("вірних відповідей: " + countChoose)
        console.log('Вибрано зображень: ' + selectedImagesCount)
        if (countChoose === selectedImagesCount) {
            result = "Вірна CAPTCHA!";
            usFunc()
        }
        alert(result);


    }
}