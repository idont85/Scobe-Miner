var counter = 0;
var bb = 0;
var audio = new Audio('scoobtrim.mp3');
var bd = 0;
var scoobies = 0;
var fake = true;
var scoobprice = 0;
var counttheclicks = 0;
var username = '';
var scobles = 0;
var twox = 0;
var fourx = 0; // Added the fourx multiplier
var multiplier = 1;
var amountperclick = 0;
var scobleprice = 0;
var scoobers = 0;

// Your Firebase initialization code here

function startUp() {
  username = localStorage.getItem('user') || 'user';
  var initial = +localStorage.getItem('clicks') || 0; // Initialize to 0 if not found
  var bbornot = localStorage.getItem('bb') || 0; // Initialize to 0 if not found
  var bdd = +localStorage.getItem('bbd') || 0; // Initialize to 0 if not found
  var scoobieCount = +localStorage.getItem('scoobie') || 0; // Initialize to 0 if not found
  scoobers = +localStorage.getItem('scoobers') || 0 // Scoober Count
  twox = +localStorage.getItem('2xmulti') || 0;
  fourx = +localStorage.getItem('4xmulti') || 0; // Added initialization for the fourx multiplier
  scobles = +localStorage.getItem('scobles') || 0;
  document.getElementById('user').value = username;
  document.getElementById('counter').innerHTML = initial;
  counter = initial;
  counttheclicks = +localStorage.getItem('counttheclicks') || 0;
  document.getElementById('counttheclicks').innerHTML = 'You have clicked ' + counttheclicks + ' times';
  document.getElementById('scooberc').innerHTML = 'You have ' + scoobers + ' scoobing machines';

  if (fourx == 1) {
    multiplier = 4;
  } else {
    if (twox == 1) {
      multiplier = 2;
    } else {
      multiplier = 1;
    }
  }
  
  if (bbornot == 1) {
    bb = 1;
    document.getElementById('bbb').style.display = 'none';
  }
  if (bdd == 1) {
    bb = 1;
    document.getElementById('bbd').style.display = 'none';
  }
  if (twox == 1) {
    document.getElementById('twomulti').style.display = 'none';
  }
  if (fourx == 1) {
    document.getElementById('fourmulti').style.display = 'none';
  }
  document.getElementById('scobular').innerHTML = 'You have ' + scoobieCount + ' scoobies';
  document.getElementById('scoble-counter').innerHTML = 'You have ' + scobles + ' scobles'
  scoobies = scoobieCount;
  scoobprice = Math.ceil(scoobies ** 1.7 + 50);
  document.getElementById('scoobie').innerHTML = 'Scoobie. Price: ' + scoobprice;
  bd = bdd;
  scobleprice = Math.ceil(scobles ** 2.1 + 50000);
  scooberprice = Math.ceil(scoobers ** 9.5 + 10000000000);
  document.getElementById('sm').innerHTML = 'Buy Scoobing Machine. Price: ' + abbreviate_number(scooberprice, 0)
  document.getElementById('scoble').innerHTML = 'Buy Scoble. Price: ' + scobleprice;

  var sps = countScobe();

  document.getElementById('clickcounter').innerHTML = 'You are making ' + sps + ' scobes per click';
  updateScoreCounter(+localStorage.getItem('clicks'))
}

function playAudio() {
  audio.volume = 0.24;
  audio.currentTime = 0;
  audio.play();
}


abbreviate_number = function(num, fixed) {
  if (num === null) { return null; } // terminate early
  if (num === 0) { return '0'; } // terminate early
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  var b = (num).toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
}

function goClick() {
  counter = +localStorage.getItem('clicks');
  if (bb == 1) {
    if (bd == 1) {
      amountperclick = 100;
    } else {
      amountperclick = 3;
    }
  } else {
    amountperclick = 1;
  }
  var cbb = scoobies * 3;
  amountperclick = amountperclick + cbb;
  amountperclick = amountperclick * multiplier;
  counter = counter + amountperclick;
  document.getElementById('counter').innerHTML = counter;
  localStorage.setItem('clicks', counter);
  playAudio();
  counttheclicks = counttheclicks + 1;
  localStorage.setItem('counttheclicks', counttheclicks);
  document.getElementById('counttheclicks').innerHTML = 'You have clicked ' + counttheclicks + ' times';
  updateScoreCounter(+localStorage.getItem('clicks'))
}

function getBb() {
  if (counter >= 20) {
    localStorage.setItem('bb', 1);
    bb = 1;
    counter = counter - 20;
    document.getElementById('counter').innerHTML = counter;
    document.getElementById('bbb').style.display = 'none';
    localStorage.setItem('clicks', counter);
    sps = countScobe();
    document.getElementById('clickcounter').innerHTML = 'You are making ' + sps + ' scobes per click';
    alert('Purchased Upgrade!');
  } else {
    alert("meanie. You don't have enough scobes.");
  }
}

function resetScore() {
  var ok = prompt("Are you sure that you want to reset your score. If so, type reset");
  if (ok === "reset") {
    // Get the current username
    var user = document.getElementById('user').value || 'user';

    // Erase the user's score from Firestore
    eraseUserScore(user);

    // Clear local storage and reload the page
    localStorage.clear();
    document.getElementById("counter").innerHTML = 0;
    alert("Score Reset!");
    bb = 0;
    localStorage.setItem('clicks', 0);
    counter = 0;
    localStorage.setItem("clicks", counter);
    location.reload();
  } else {
    alert("Score not erased. Reason: Incorrect Password/Canceled");
  }
}

function getSc() {
  counter = +document.getElementById("counter").innerHTML;
  if (counter >= scoobprice) {
    localStorage.setItem("scoobie", scoobies + 1);
    scoobies = scoobies + 1;
    localStorage.setItem('scoobie', scoobies);
    counter = counter - scoobprice;
    localStorage.setItem("clicks", counter);
    document.getElementById("counter").innerHTML = counter;
    scoobprice = Math.ceil(scoobies ** 2 + 50);
    document.getElementById("scoobie").innerHTML =
      'Scoobie. Price: ' + scoobprice;
    document.getElementById('scobular').innerHTML = "You have " + scoobies + " scoobies";
    sps = countScobe()
    document.getElementById('clickcounter').innerHTML = "You are making " + sps + " scobes per click"
    alert("Another scoobie is now working for you!");
  } else {
    alert("meanie. You don't have enough scobe");
  }
}

function getBd() {
  counter = +document.getElementById("counter").innerHTML;
  if (counter >= 10000) {
    localStorage.setItem("bbd", 1);
    document.getElementById("bbd").style.display = "none";
    counter = counter - 10000;
    document.getElementById("counter").innerHTML = counter;
    localStorage.setItem("clicks", counter);
    bd = 1;
    sps = countScobe()
    document.getElementById('clickcounter').innerHTML = "You are making " + sps + " scobes per click"
    alert("Make sure to vote Mustafa Azhar for president! He doesn't rest, 'till you get the best!")
    alert("Purchased Upgrade!")
  } else {
    alert("meanie. You don't have enough scobes");
  }
}

function countScobe() {
  scoobies = +localStorage.getItem('scoobie') || 0;
  var scoobymoney = scoobies * 3;
  var clickmoney = 0;
  if (bb == 1) {
    if (bd == 1) {
      clickmoney = 100;
    } else {
      clickmoney = 3;
    }
  } else {
    clickmoney = 1;
  }
  var finalamount = clickmoney + scoobymoney;
  finalamount = finalamount * multiplier;
  return finalamount;
}

// Encryption function
function encrypt(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) + 5; // Shift the character code by 5
    result += String.fromCharCode(charCode);
  }
  return result;
}

// Decryption function
function decrypt(encryptedText) {
  let result = '';
  for (let i = 0; i < encryptedText.length; i++) {
    const charCode = encryptedText.charCodeAt(i) - 5; // Shift the character code back by 5
    result += String.fromCharCode(charCode);
  }
  return result;
}

// Export save function with encryption
function exportSave() {
  // Create an object to store the game state
  var saveData = {
    clicks: counter,
    bb: bb,
    bbd: bd,
    scoobie: scoobies,
    counttheclicks: counttheclicks,
    scobles: scobles,
    twoxmulti: twox, // Save the twox variable
    fourxmulti: fourx, // Save the fourx variable
    scoobers: scoobers,
  };

  // Convert the object to a JSON string and encrypt it
  var saveString = encrypt(JSON.stringify(saveData));

  // Display the encrypted save data as an alert or in a text field for the user to copy
  prompt("Copy the following save data: ", saveString)
}

// Import save function with decryption
function importSave() {
  // Get the save data from the input field
  var saveString = document.getElementById("importInput").value;

  try {
    // Decrypt the save data and parse the JSON string into an object
    var decryptedSaveString = decrypt(saveString);
    var saveData = JSON.parse(decryptedSaveString);

    // Update the game state with the imported data
    counter = saveData.clicks || 0;
    bb = saveData.bb || 0;
    bd = saveData.bbd || 0;
    scoobies = saveData.scoobie || 0;
    counttheclicks = saveData.counttheclicks || 0;
    scobles = saveData.scobles || 0;
    twox = saveData.twoxmulti || 0; // Update the twox variable
    fourx = saveData.fourxmulti || 0; // Update the fourx variable
    scoobers = saveData.scoobers || 0;

    // Update the game UI to reflect the imported data
    document.getElementById("counter").innerHTML = counter;
    document.getElementById("counttheclicks").innerHTML = "You have clicked " + counttheclicks + " times";
    if (bb === 1) {
      document.getElementById("bbb").style.display = "none";
    }
    if (bd === 1) {
      document.getElementById("bbd").style.display = "none";
    }
    document.getElementById("scobular").innerHTML = "You have " + scoobies + " scoobies";
    scoobprice = Math.ceil(scoobies ** 1.7 + 50);
    document.getElementById("scoobie").innerHTML = 'Scoobie. Price: ' + scoobprice;
    if (fourx == 1) {
      multiplier = 4;
    } else {
      if (twox === 1) { // Update the multiplier based on the imported value
        multiplier = 2;
      } else {
        multiplier = 1;
      }
    }

    // Save the imported data to localStorage
    localStorage.setItem("clicks", counter);
    localStorage.setItem("bb", bb);
    localStorage.setItem("bbd", bd);
    localStorage.setItem("scoobie", scoobies);
    localStorage.setItem("counttheclicks", counttheclicks);
    localStorage.setItem("2xmulti", twox); // Save the twox variable
    localStorage.setItem('4xmulti', fourx); // Save the fourx variable
    localStorage.setItem('scoobers', scoobers)

    // Save the scobles variable
    localStorage.setItem("scobles", scobles);

    // Notify the user that the import was successful
    alert("Save data imported successfully!");
    location.reload();
  } catch (error) {
    // Handle any parsing errors
    alert("Error importing save data. Please check the format.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var buttonContainer = document.getElementById("button-container");
  var buttons = document.querySelectorAll(".gen");
  buttonContainer.addEventListener("mouseenter", function () {
    buttonContainer.classList.add("active");
  });
  buttonContainer.addEventListener("mouseleave", function () {
    buttonContainer.classList.remove("active");
  });
});

// Function to update leaderboard
function updateLeaderboard() {
  console.log("Updating leaderboard...");
  // Update Firestore with the user's score or data
  var userScore = parseFloat(localStorage.getItem('clicks'));
  var useree = username; // Replace with the user's username or identifier

  // Create a Firestore batch
  var batch = db.batch();
  var leaderboardRef = db.collection("leaderboard");

  // Query the leaderboard for messages with the same username
  leaderboardRef.where("username", "==", useree)
    .get()
    .then(function(querySnapshot) {
      // Iterate through the messages with the same username and delete them
      querySnapshot.forEach(function(doc) {
        batch.delete(leaderboardRef.doc(doc.id));
      });

      // Add the new leaderboard entry
      batch.set(leaderboardRef.doc(), {
        username: useree,
        score: userScore,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Commit the batched writes
      return batch.commit();
    })
    .then(function() {
      console.log("Leaderboard updated successfully.");
      console.log('Updated leaderboard with ' + useree + "score:" + userScore)
    })
    .catch(function(error) {
      console.error("Error updating leaderboard: ", error);
    });
}

// Call the updateLeaderboard function every 5 minutes after the page loads
setInterval(function() {
  console.log('firing')
  var currentTime = new Date();
  var fiveMinutesInMilliseconds = 4 * 60 * 1000;

  if (currentTime - pageLoadTime >= fiveMinutesInMilliseconds) {
    updateLeaderboard();
  }
}, 60 * 1000); // Check every minute (adjust as needed)

// Record the page load time
var pageLoadTime = new Date();

// Function to populate the leaderboard
// Modify the populateLeaderboard function to retrieve all scores and then limit to the top 10
function populateLeaderboard() {
  // Fetch all leaderboard data without limiting initially
  db.collection("leaderboard")
    .orderBy("score", "desc") // Order by score in descending order
    .get()
    .then(function(querySnapshot) {
      // Clear existing leaderboard entries
      var leaderboardList = document.getElementById("leaderboard-list");
      leaderboardList.innerHTML = "";

      // Create an array to store leaderboard entries
      var leaderboardEntries = [];

      // Populate the leaderboard entries with fetched data
      querySnapshot.forEach(function(doc) {
        var data = doc.data();
        var username = data.username || "Anonymous";
        var score = parseInt(data.score) || 0; // Convert score to an integer

        leaderboardEntries.push({ username, score });
      });

      // Sort the entries by score in descending order
      leaderboardEntries.sort(function(a, b) {
        return b.score - a.score;
      });

      // Limit the entries to the top 10
      leaderboardEntries = leaderboardEntries.slice(0, 10);

      // Populate the leaderboard list with sorted and limited entries
      leaderboardEntries.forEach(function(entry) {
        var listItem = document.createElement("li");
        listItem.innerHTML = `
          <span class="username">${entry.username}</span>
          <span class="score">${entry.score} Scobes</span>
        `;

        leaderboardList.appendChild(listItem);
      });
    })
    .catch(function(error) {
      console.error("Error fetching leaderboard data: ", error);
    });
}

// Call the populateLeaderboard function when the page loads
window.addEventListener("load", populateLeaderboard);


// Function to erase a user's score from Firestore
function eraseUserScore(username) {
  var leaderboardRef = db.collection("leaderboard");

  // Query the leaderboard for the document with the specified username
  leaderboardRef.where("username", "==", username)
    .get()
    .then(function(querySnapshot) {
      // Iterate through the query result (should be only one document)
      querySnapshot.forEach(function(doc) {
        // Delete the document
        doc.ref.delete()
          .then(function() {
            console.log("Document successfully deleted from Firestore");
          })
          .catch(function(error) {
            console.error("Error deleting document: ", error);
          });
      });
    })
    .catch(function(error) {
      console.error("Error querying Firestore: ", error);
    });
}


setInterval(function() {
  usey = document.getElementById('user').value;
  localStorage.setItem('user', usey);
}, 1000);


//Scoble Mechanics
setInterval(function() {
  var scoblepersecond = scobles * 2000;
  counter = counter + scoblepersecond;
  document.getElementById('counter').innerHTML = counter;
  localStorage.setItem('clicks', counter);
  updateScoreCounter(+localStorage.getItem('clicks'))
}, 1000);

function buyScoble() {
  counter = +localStorage.getItem('clicks');
  if (counter >= scobleprice) {
    counter = counter - scobleprice;
    localStorage.setItem('clicks', counter);
    localStorage.setItem('scobles', scobles + 1);
    scobles = scobles + 1;
    scobleprice = Math.ceil(scobles ** 2.1 + 50000);
    document.getElementById('scoble').innerHTML = 'Buy Scoble. Price: ' + scobleprice;
    alert("A scoble is now working for you.");
    document.getElementById('scoble-counter').innerHTML = 'You have ' + scobles + ' scobles'; // Add this line
  } else {
    alert("meanie. You don't have enough scobes");
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

function addTwo() {
  counter = +document.getElementById("counter").innerHTML;
  if (counter >= 6000000) {
    localStorage.setItem("2xmulti", 1);
    document.getElementById("twomulti").style.display = "none";
    counter = counter - 10000000;
    document.getElementById("counter").innerHTML = counter;
    localStorage.setItem("clicks", counter);
    twox = 1;
    multiplier = 2;
    sps = countScobe();
    document.getElementById('clickcounter').innerHTML = "You are making " + sps + " scobes per click";
    alert("You are now making 2x profit per click!");
  } else {
    alert("meanie. You don't have enough scobes");
  }
}

function buy4xMultiplier() {
  counter = +localStorage.getItem('clicks');
  if (counter >= 5000000000) { // Adjust the cost as needed
    localStorage.setItem("4xmulti", 1);
    document.getElementById("fourmulti").style.display = "none";
    counter = counter - 5000000000; // Adjust the cost as needed
    document.getElementById("counter").innerHTML = counter;
    localStorage.setItem("clicks", counter);
    fourx = 1;
    multiplier = 4; // Set the multiplier to 4x
    sps = countScobe();
    document.getElementById('clickcounter').innerHTML = "You are making " + sps + " scobes per click";
    alert("You are now making 4x profit per click!");
  } else {
    alert("meanie. You don't have enough scobes");
  }
}

function filterUsername() {
  var usernameInput = document.getElementById('user');
  var forbiddenWords = ['fuck', 'ass', 'shit', 'bitch', 'nigger', 'dick', 'motherfucker', 'cock', 'fucker', 'asscock', 'penis','shoot', 'shot', 'shooter', 'bullshit', 'fucker', 'niger', 'asshole', 'nig', 'cock', 'cake', 'ahh', 'baddie', 'panty', 'pantry', 'showing']; // Add your forbidden words to this array

  var sanitizedUsername = usernameInput.value.trim().toLowerCase();
  
  for (var i = 0; i < forbiddenWords.length; i++) {
    var forbiddenWord = forbiddenWords[i].toLowerCase();
    
    if (sanitizedUsername.includes(forbiddenWord)) {
      // Clear the input field and show a message
      usernameInput.value = '';
      return;
    }
  }

  // If the username is clean, you can store it in localStorage or use it as needed
  localStorage.setItem('user', sanitizedUsername);
}


function updateScoreCounter(score) {
  const scoreCounter = document.getElementById('counter');

  // Define the maximum font size
  const maxFontSize = 60; // You can adjust this as needed

  // Convert the score to a string
  const scoreString = score.toString();

  // Calculate the font size based on the score length
  const fontSize = Math.min(maxFontSize, 400 / scoreString.length);

  // Set the font size for the score counter
  scoreCounter.style.fontSize = `${fontSize}px`;

  // Update the score text
  scoreCounter.textContent = `${score}`;
}

function getScoober() {
  counter = +localStorage.getItem('clicks')
  if (counter >= scooberprice) {
    counter = counter - scooberprice
    scoobers = scoobers + 1
    localStorage.setItem('scoobers', scoobers)
    localStorage.setItem('clicks', counter)
    document.getElementById('scooberc').innerHTML = 'You have ' + scoobers + ' scoobing machines';
    scooberprice = Math.ceil(scoobers ** 8 + 10000000000)
    document.getElementById('sm').innerHTML = 'Buy Scoobing Machine. Price: ' + abbreviate_number(scooberprice, 0)
    alert("A scoobing machine is now working for you.");
  } else {
    alert("meanie. You don't have enough scobes")
  }
}

setInterval(function() {
  var scooberpersecond = scoobers * 200000000;
  counter = counter + scooberpersecond;
  document.getElementById('counter').innerHTML = counter;
  localStorage.setItem('clicks', counter);
  updateScoreCounter(+localStorage.getItem('clicks'))
}, 2000);

function clearLeaderboard() {
  var password = prompt("Enter password to clear leaderboard:")
  if (password == 'scobies19') {
    db.collection("leaderboard")
      .get()
      .then(res => {
        res.forEach(element => {
          element.ref.delete();
        });
  });
  } else {
    alert("Incorrect Password/Canceled")
  }
}

function moveOver() {
  window.location.href = "changelog.html";
}
