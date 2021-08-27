const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden= true;
}
// Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show new quote 
function newQuote(){
    loading();
     //Pick a rondom quote from apiQuotes array
     const quote= apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
     // check if author field is blank and replace it with 'Unknown'
     if(!quote.author){
         authorText.textContent= 'Unknown';
     } else {
         authorText.textContent = quote.author; 
     }
     // check quote length to determine styling
     if(quote.text.length > 100) {
         quoteText.classList.add('long-quote');
     } else {
        quoteText.classList.remove('long-quote');
     }
     // Set Quote , Hide Loader
     quoteText.textContent = quote.text;
     complete(); 
}

//get quoes from api

async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
      //console.log(apiQuotes[40]);
    } catch (error) {
        //catch error here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);



// on load
getQuotes();


