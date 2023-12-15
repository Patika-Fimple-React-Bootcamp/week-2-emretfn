[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/89R_Qkgn)

# Week 2

##### Assignment Author: Mustafa Emre TUFAN

##### See Live [Here](https://week-2-emretfn.netlify.app/)

![Home Page](./assets/images/homepage.png)
![Home Page with modal](./assets/images/homepage-with-modal.png)

## 📑 Assingment

👉 Sayfa açıldığında "https://jsonplaceholder.typicode.com/posts" api'sine istek atıp verileri sayfada gösteriyorsunuz. <br>
👉 Sayfanın üst kısmında bir header olacak ve bu header içerisinde bir tane search filtresi olacak. Bu search gelen verideki "title" ve "body" içerisinde eşleşen postları göstericek. Boş olursa, tüm veri gelecek.<br>
👉 Her post card şeklinde gösterilecek ve bir delete butonu olacak. O butona tıklayınca o post silenecek.<br>
👉 Post'un üzerine tıklanırsa eğer o post id'si ile "https://jsonplaceholder.typicode.com/posts/$%7BpostId%7D/comments" istek atıp, çıkan sonucu modal içerisinde göstericek.<br>
👉 Css önemli, flex veya grid kullanıp responsive tasarlamanızı istiyorum. Ekran küçüldüğünde de sorunsuz bir görüntü olmalı.<br>

**Ekstralar:** Silerken bir confirm modalı çıkarsa güzel olur. Ayrıca kendini denemek isteyen arkadaşlar, search kısmına debounce koyabilir.

## 💻 Code Structure

The codebase is structured as follows:

👉 `index.html`: This is the main HTML file that includes the structure of the web page.<br>
👉 `index.js`: This JavaScript file includes the main functionality of the application.<br>
👉 `style.css`: This file includes all the styles used in the application.<br>
👉 `reset.css`: This file resets the default styles of the browser to avoid inconsistencies.<br>

## ⚙️ Installation and Setup

To set up and run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Open the `index.html` file in your browser.

## 🔮 Future Improvements

👉 Improve the UI/UX of the application.<br>
👉 Add more features like editing and updating the posts.<br>
👉 Improve error handling.<br>
