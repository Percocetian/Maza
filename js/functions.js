var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
	
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

// Replace the startHeartAnimation function with this simpler version
function startHeartAnimation() {
    showMessages();
}

// Modify the showMessages function
function showMessages() {
    // Hide both elements initially
    $('#messages').hide();
    $('#elapseClock').hide();
    
    // Fade in ZAUVIJEK and timer together
    $('#messages').fadeIn(2000, function() {
        timeElapse(together);
        $('#elapseClock').fadeIn(2000, function() {
            // Start updating the timer only after fade-in is complete
            setInterval(function () {
                timeElapse(together);
            }, 500);
            
            // Show love text after timer is visible
            setTimeout(function() {
                showLoveU();
            }, 2000);
        });
    });
}

// Update the showLoveU function
function showLoveU() {
    $('#loveu').fadeIn(1500, function() {
        // After love text fades in, fade in the gallery
        setTimeout(function() {
            $('#gallery').css('display', 'block').hide().fadeIn(1500);
        }, 500);
    });
}

// Update the typewriter function to remove duplicate timer initialization
$.fn.typewriter = function() {
    this.each(function() {
        var $ele = $(this), str = $ele.html(), progress = 0;
        $ele.html('');
        var timer = setInterval(function() {
            var current = str.substr(progress, 1);
            if (current == '<') {
                progress = str.indexOf('>', progress) + 1;
            } else {
                progress++;
            }
            $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
            if (progress >= str.length) {
                clearInterval(timer);
                setTimeout(function() {
                    startHeartAnimation();
                }, 1000);
            }
        }, 55); // Slower typing speed
    });
    return this;
};

// Update the timeElapse function to handle opacity
function timeElapse(date) {
    var current = new Date();
    var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
    var days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    var result = "<span class=\"digit\">" + days + "</span> dana <span class=\"digit\">" + hours + "</span> sati <span class=\"digit\">" + minutes + "</span> minuta <span class=\"digit\">" + seconds + "</span> sekundi"; 
    $("#elapseClock").html(result);
}

// Add this function to ensure images load properly
$(document).ready(function() {
    $('.gallery-item img').on('error', function() {
        $(this).attr('src', 'images/placeholder.jpg');
    });
});
