addEventListener('message', function(e) {
  if (e.data=="Are you there?") {
	postMessage("Yes, sir");
  }
}, false);

setTimeout(function() { postMessage("Working..."); }, 2000);

setTimeout(function() { postMessage("Still working..."); }, 4000);
