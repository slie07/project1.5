$ (document).ready();

$(function() {

    var anim_id;


    //saving dom objects to variables
    var container = $('#container');
    var car_4 = $('#car_4');
    var car = $('#car');
    var car_1 = $('#car_1');
    var car_2 = $('#car_2');
    var car_3 = $('#car_3');
    var line_1 = $('#line_1');
    var line_2 = $('#line_2');
    var line_3 = $('#line_3');
    var restart_div = $('#restart_div');
    var restart_btn = $('#restart');
    var score = $('#score');

    //saving some initial setup
    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var car_width = parseInt(car.width());
    var car_height = parseInt(car.height());
    var car_4_width = parseInt(car_4.width());
    var car_4_height = parseInt(car_4.height());


    //some other declarations
    var game_over = false;

    var score_counter = 1;

    var speed = 2;
    var line_speed = 5;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;
    var move_right1 = false;
    var move_left1 = false;
    var move_up1 = false;
    var move_down1 = false;



 // /* Movement on player2 */ using requestAnimationFrame function to make a smooth transition 


    $(document).on('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 65 && move_left1 === false) {
                move_left = requestAnimationFrame(left1);
                // left1();
            } else if (key === 68 && move_right1 === false) {
                move_right = requestAnimationFrame(right1);
                // right1();
            } else if (key === 87 && move_up1 === false) {
                move_up = requestAnimationFrame(up1);
                // up1();
            } else if (key === 83 && move_down1 === false) {
                move_down = requestAnimationFrame(down1);
                // down1();
            }
              else if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
                // left();
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
                // right();
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
                // up();
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
                // down();
            }
        }
    });

    $(document).on('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 65) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 68) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 87) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 83) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }

              else if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });
    function left1() {
        if (game_over === false && parseInt(car_4.css('left')) > 0) {
            car_4.css('left', parseInt(car_4.css('left')) - 5);
            requestAnimationFrame(left1);
        }
    }
    // defining what function right is 
    function right1() {
        if (game_over === false && parseInt(car_4.css('left')) < container_width - car_width) {
            car_4.css('left', parseInt(car_4.css('left')) + 5);
            move_right = requestAnimationFrame(right1);
        }
    }
     // defining what function up is 
    function up1() {
        if (game_over === false && parseInt(car_4.css('top')) > 0) {
            car_4.css('top', parseInt(car_4.css('top')) - 3);
            move_up = requestAnimationFrame(up1);
        }
    }
     // defining what function down is 
    function down1() {
        if (game_over === false && parseInt(car_4.css('top')) < container_height - car_4_height) {
            car_4.css('top', parseInt(car_4.css('top')) + 3);
            move_down = requestAnimationFrame(down1);
        }
    }

    // defining what function left is 

    function left() {
        if (game_over === false && parseInt(car.css('left')) > 0) {
            car.css('left', parseInt(car.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }
    // defining what function right is 
    function right() {
        if (game_over === false && parseInt(car.css('left')) < container_width - car_width) {
            car.css('left', parseInt(car.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }
     // defining what function up is 
    function up() {
        if (game_over === false && parseInt(car.css('top')) > 0) {
            car.css('top', parseInt(car.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }
     // defining what function down is 
    function down() {
        if (game_over === false && parseInt(car.css('top')) < container_height - car_height) {
            car.css('top', parseInt(car.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }

    /* Move the cars and lines */
    anim_id = requestAnimationFrame(repeat);

    function repeat() {
        if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3) || collision(car_4, car_1) || collision(car_4, car_2) || 
            collision(car_4, car_3)) {
            stop_the_game();
            return;
        }

        score_counter++;

        if (score_counter % 20 == 0) {
            score.text(parseInt(score.text()) + 1);
        }
        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;
        }

        car_down(car_1);
        car_down(car_2);
        car_down(car_3);

        line_down(line_1);
        line_down(line_2);
        line_down(line_3);

        anim_id = requestAnimationFrame(repeat);
    }

    function car_down(car) {
        var car_current_top = parseInt(car.css('top'));
        if (car_current_top > container_height) {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (container_width - car_width));
            car.css('left', car_left);
        }
        car.css('top', car_current_top + speed);
    }

    function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }

    restart_btn.click(function() {
        location.reload();
    });

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();
    }

    /* ------------------------------GAME CODE ENDS HERE------------------------------------------- */
$('html, body').css({
    overflow: 'hidden',       //disables scrolling
    height: '100%'            //disables scrolling
});

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }



});

