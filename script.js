// console.log('Quote-Generator');

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById("new-quote");
const Loader = document.getElementById('loader');


let apiQuotes = [];

// Show Loading 
function loading(){
    Loader.hidden = false ;
    quoteContainer.hidden = true;
}

function complete(){
    if(!Loader.hidden){
        quoteContainer.hidden = false;
        Loader.hidden = true;
    }
}

function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);
    if(!quote.author){
    quoteText.textContent = 'Unknown';
    }
    else{
        quoteText.textContent = quote.text;
    }
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove("long-quote");
    }
    authorText.textContent = quote.author;

    // for adding wait to show next quote
    /*const time = Math.floor(Math.random() * 10);
    console.log(time);
    setTimeout(complete, 100*time);*/
    complete();

}



async function getQuotes(){
    const apiUrl =
      "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[2]);
        newQuote();
    } catch (error) {
        alert(error);
    }
}


function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

//Event Listener
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

getQuotes();