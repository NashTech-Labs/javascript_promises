$(document).ready(function() {
  let deckId;

  // Function to request a single card from a newly shuffled deck
  function drawCard() {
    const drawCardUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;

    $.getJSON(drawCardUrl)
      .done(function(response) {
        const card = response.cards[0];
        const cardValue = card.value;
        const cardSuit = card.suit;

        console.log(`${cardValue} of ${cardSuit}`);

        // Display card on the page
        const cardDisplay = $('#card-display');
        cardDisplay.empty();
        cardDisplay.append(`<img src="${card.image}" alt="${cardValue} of ${cardSuit}">`);
      })
      .fail(function(error) {
        console.log('Error:', error);
      });
  }

  // Function to create a new deck and get the deck ID
  function createNewDeck() {
    const newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

    $.getJSON(newDeckUrl)
      .done(function(response) {
        deckId = response.deck_id;
        console.log('New deck created with ID:', deckId);
      })
      .fail(function(error) {
        console.log('Error:', error);
      });
  }

  // Event listener for the "Draw a Card" button
  $('#draw-card-button').on('click', function() {
    drawCard();
  });

  // Create a new deck when the page loads
  createNewDeck();
});
