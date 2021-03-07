<p> If you want to take a look on all screens of the App, click <a href="https://biel-97.github.io/sign/#/sign/login" target="_blank">here.</a></p>
<p><strong>OBS:. use google chrome or firefox for more efficient.</strong></p>
<h2>Goal</h2> 
<p><i>"Use my knowledge to improve and test my skills as a programmer".:rocket:</i></p>

<p>This project is part of my portfolio, so feel free to get in touch for feedback on the code, structure or other reason that will help me become a better programmer!</p>

<span>E-mail: <a>gabriel.pso100@gmail.com</a ></span><br>
<span><a target="_blank" href="https://www.linkedin.com/in/gabriel-97-oliveira">linkedin</a></span><br>

<h2>Observations</h2>

<p>this is a <strong>Jyotisha chart</strong> also known as <strong>Vedic astrology</strong> which is an <strong>Indian system of astrology</strong> that uses <strong>Ayanamsa Lahiri</strong>, being different from the traditional western astrology, so it is possible to have differences in signs between these two methodologies.</p>

<p>If you want to check the back-end services repository, click <a target="_blank" href="https://github.com/Biel-97/sign-back"> here</a>.</p>

<p>It was utilized the Astrosoft API to get truthful astrology, you can check the api <a href="http://docs.innovativeastrosolutions.com/" target="_blank">here</a>.</p>

<p>Also it was utilized a api to convert places and addresses and get the latitude and longitude, click <a href="https://positionstack.com/documentation" target="_blank">here</a> to read more.</p>

<p>
This app is hosted on <strong>heroku free plan</strong>, meaning that on the initial load, the server mat neet to start which can cause a <strong>delay</strong>.
</p>

	
<h2>Functionalities</h2>
• login and password with authentication token.<br>
• obtains the signs according to the date of birth, place of birth and timezoneid.<br>
• stores search data in a database that can be accessed at any time, being possible to delete it as well.<br><br>


<strong>OBS:. the database is using a free hosting, which can lead to a storage limitation, so for each account only 5 maps will be allowed, but they can be deleted at any time by the user, giving space for a new astrological chart..:sweat_smile:</strong>
<hr>

<h2>Cloning the Repository</h2>
<span>$ git clone https://github.com/Biel-97/sign-back</span><br>
<span>$ cd sign-back</span><br>
<span>$ npm install</span>
<br>

<h2>setting the app</h2>
Now, three things are importants:<br>
<p>if you run this app in local environment, you have to had install the <strong>mongodb and node js</strong>  to get everything in work.</p>
<p>you can find the methodology to <strong>cloning and config the front-end repository <a target="_blank" href="https://github.com/Biel-97/sign"> here</a></strong></p>

<p>its important create a <strong>.env</strong>  file in the root application with the following variables:<p>

<strong>URL_HOROSCOPO </strong> <i>---- </i>its the url to get the horoscopo information, in this project was using this url: https://api.innovativeastrosolutions.com/v0/horoscope<br>
<strong>URL_GEOLOCATION </strong> <i>---- </i>its the url to get the geolocation information, in this project was using this url: http://api.positionstack.com/v1/forward<br>
<!-- <strong>URL_HOST </strong> <i>---- </i>its the url that the server will accept to send and receive data, if you run this project in a local enviroment, you can leave it in blank, that will be setup by default to: http://localhost:3000/<br> -->
<strong>API_KEY_HOROSCOPO </strong> <i>---- </i>this is the api key to use in the requests of horoscopo, to get one, read the following documentation <a target="_blank" href="http://docs.innovativeastrosolutions.com/">here</a> .<br>
<strong>API_KEY_GEOLOCATION </strong> <i>---- </i>this is the api key to use in the requests of geolocation, to get one, read the following documentation <a target="_blank" href="https://positionstack.com/documentation">here</a> .<br>
<strong>TOKEN_HASH </strong> <i>---- </i>is the token that will be used to encode the user's password, you can randomly configure a sequence of characters to form that token.<br>
<strong>MONGO_DB_ACESS </strong> <i>---- </i>its the mongo database acess, if you run this project in a local enviroment, you can leave it in blank, that will be setup by default to : mongodb://localhost/SignUser.<br>




<h2>Built With</h2>
<span>• axios </span><br>
<span>• bcryptjs </span><br>
<span>• body-parser</span><br>
<span>• cors</span><br>
<span>• dotenv</span><br>
<span>• express</span><br>
<span>• jsonwebtoken</span><br>
<span>• mongoose</span><br><br>

<hr>
<span>E-mail: <a>gabriel.pso100@gmail.com</a ></span><br>

<span><a href ="http://www.linkedin.com/in/gabriel-97-oliveira" target="_blank">LinkedIn</a> </span><br>

:thumbsup:
 
