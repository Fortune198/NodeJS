$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/courses", (results = {}) => {
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach(course => {
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<button class='button ${course.joined ? "joined-button" : "join-button"}' data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();//add event listener on buttons ater request completes 
    });
  });
});

let addJoinButtonListener = () => {//event listener for modal button
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id");//grab button and button ID
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {//make request with courses ID
      let data = results.data;
      if (data && data.success) {//check if successful
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};
