import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug", //src안의 모든 폴더 볼려면 src/**/*.pug
    dest: "build",
  },
};
const pug = () => gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));
//gulp.dest()는 파일을 어디다가 두느냐

const clean = () => del(["build"]); //build폴더 알아서 지우게 만들려고

const webserver = () => gulp.src("build").pipe(ws({ livereload: true, open: true }));

const watching = () => {
  gulp.watch(routes.pug.watch, pug);
};
const prepare = gulp.series([clean]);
const assets = gulp.series([pug]);
const postDev = gulp.parallel([webserver, watching]); //parallel쓰면 동시실행

export const dev = gulp.series([prepare, assets, postDev]);

//task는 모든 pug 파일을 가지고 이것들을 다른 폴더에 집어넣는게 하나의 task가 될수 있음
//우선 이것드을 html로 바꾸고
//그리고 scss를 css로 바꾸기도 하고 css라는 폴더에 넣는거솓 그렇고
//이러한 task 들을 그룹으로 묶을수 있음.

//예를들어 dev 라는 하나의 task가 이미지를 최적화하고 js를 압축하고
// 모든 파일을 한폴더에 넣고, 브라우저 출력등 여러 task를 한번에
// 여러 파트를 만들 수 있다. 예를 들어 한 파트가 pug면 다른 한 파트는 scss,
// 어떤 파트는 js를 맡고 있고 어떤 파트는 img를 맡고 어떤 파트는 모든 파일을 한 폴더에 넣고
//다른 파트는 브라우저로 열어서 보여주기도 함

//gulp pug는 pug 템플릿을 컴파일 해준다. webpack으로 치면 loaders 플러그인

//gulp는 파일을 일종의 흐름으로 만드는데 거기다가 pipe를 연결하는거지, pipe안에서 일이 일어나는거지
//export는 package.json에서 쓸 command만 해주면됨
//만약 clean을 export 하지 않는다면, console이나 package.json에서 사용못함
