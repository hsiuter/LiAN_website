// const discs = document.querySelectorAll('.song-disc');
// const audios = document.querySelectorAll('.song-audio');

// discs.forEach((disc, index) => {
//     const audio = audios[index];
//     const songNeedle = disc.querySelector('.song-needle');
//     const songImg = disc.querySelector('.song-img');
//     const playBtn = disc.querySelector('.play-btn');

//     disc.addEventListener('click', function () {
//         // 如果当前音频播放，暂停它，否则播放它
//         if (audio.paused) {
//             // 暂停其他的音乐和动画
//             audios.forEach((otherAudio, otherIndex) => {
//                 if (otherIndex !== index) {
//                     otherAudio.pause();
//                     discs[otherIndex].querySelector('.song-needle').classList.remove('play');
//                     discs[otherIndex].querySelector('.song-img').classList.remove('play');
//                     discs[otherIndex].querySelector('.play-btn').classList.remove('play');
//                 }
//             });

//             audio.play();
//             songNeedle.classList.add('play');
//             songImg.classList.add('play');
//             playBtn.classList.add('play');
//         } else {
//             audio.pause();
//             songNeedle.classList.remove('play');
//             songImg.classList.remove('play');
//             playBtn.classList.remove('play');
//         }
//     });

//     // 当音频播放完成时，重置动画状态
//     audio.addEventListener('ended', function () {
//         songNeedle.classList.remove('play');
//         songImg.classList.remove('play');
//         playBtn.classList.remove('play');
//     });
// });

// $(document).ready(function () {
//     const loading = document.getElementById("loading");
//     loading.style.zIndex = "-1";
//     var textWrapper = document.querySelector('.ml3');
//     textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

//     // 第一个动画
//     var firstAnimation = anime.timeline({ loop: false })
//         .add({
//             targets: '.ml3 .letter',
//             opacity: [0, 1],
//             easing: "easeInOutQuad",
//             duration: 2250,
//             delay: (el, i) => 150 * (i + 1)
//         });

//     // 监听第一个动画的完成事件
//     firstAnimation.finished.then(function () {
//         // 第一个动画完成后，执行第二个动画
//         const textContainer = document.getElementById("textContainer");
//         const line = document.getElementById("line");
//         const witch = document.getElementById("witch");
//         const witch_2 = document.getElementById("witch_2");
//         // Simple delay to show the second animation. You can change the delay as needed.
//         setTimeout(() => {
//             textContainer.classList.remove("hidden");
//             textContainer.classList.add("shown");
//             line.style.top = "50%";
//             witch.style.fontSize = "350px";
//             witch.style.opacity = "1";
//             witch_2.style.fontSize = "350px";
//             witch_2.style.opacity = "1";
//         }, 3500);
//     });
// });


document.body.onkeydown = function (e) {
    var keyCode = e.keyCode || e.which || e.charCode;
    var ctrlKey = e.ctrlKey || e.metaKey;
    if (ctrlKey && (keyCode == 83 || keyCode == 85 || keyCode == 73)) {
        e.preventDefault();
        return false;
    }
    else if (ctrlKey && (keyCode == 83 || keyCode == 85 || keyCode == 67)) {
        e.preventDefault();
        return false;
    } else if (keyCode && keyCode == 123) {
        return false;
    }
}

function clear() {
    Source = document.body.firstChild.data;
    document.open();
    document.close();
    document.title = "看不到源代码";
    document.body.innerHTML = Source;
}