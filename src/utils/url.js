export default {
  //直播分类列表
  getLiveCourseCategory:() => `mock/course/course_category.json`,

  //某个分类下的直播课程列表
  getLiveCourseList:(category, page, page_size) => `mock/course/course_data.json?category=${category}&page=${page}&page_size=${page_size}`,

  //获取班级列表
  getListTeamList:(category, page, page_size) => `mock/team/team_data.json?category=${category}&page=${page}&page_size=${page_size}`,

  //获取用户列表
  getTeamStudentList:(team, page, page_size) => `mock/student/student_data.json?team=${team}&page=${page}&page_size=${page_size}`,

  //已购买某直播课程的用户列表
  getPurchaseStudentList:(live_course, page, page_size) => `mock/student/student_data.json?live_course=${live_course}&page=${page}&page_size=${page_size}`,
};
