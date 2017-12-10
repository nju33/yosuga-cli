import gulp from 'gulp';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import gif from 'gulp-if';
import PrettyError from 'pretty-error';
import beeper from 'beeper';

const dev = process.env.NODE_ENV === 'dev';
const prod = process.env.NODE_ENV === 'prod';
const babelConf = {
  presets: [['env', {targets: {node: 8}}]],
  plugins: [
    'transform-decorators-legacy',
    'transform-object-rest-spread',
    'transform-class-properties',
    'add-module-exports'
  ]
};

gulp.task('lib', () => {
  return gulp
    .src('src/**/*.js')
    .pipe(plumber({errorHandler: onError}))
    .pipe(babel(babelConf))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['lib'], () => {
  gulp.watch('src/**/*.js', ['lib']);
});

const pe = new PrettyError();
function onError(err) {
  console.log(pe.render(err));
  beeper(2);
}
