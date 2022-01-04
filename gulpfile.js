// Dependências
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Compilar o SASS e adicionar os prefixos
function compilaSass(){
    return gulp
    .src('assets/scss/**/*.scss')
    .pipe(autoPrefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}
// Tarefa para a função compilaSass
gulp.task('sass', compilaSass);

// Função para concatenar e minificar o JS 
function gulpJS(){
    return gulp
    .src('assets/js/*.js')
    .pipe(concat('main.min.js'))
    // Transpilar o JS utilizando o Babel
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}
// Tarefa para a função gulpJS
gulp.task('mainJS', gulpJS);

// Função para iniciar o browserSync
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}
// Tarefa para a função browser
gulp.task('browser-sync', browser);

// Função watch do gulp (monitora os arquivos e executa as funções pré-definidas)
function watch() {
    gulp.watch('assets/scss/**/*.scss', compilaSass);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('assets/js/*.js', gulpJS);
}
// Tarefa de watch
gulp.task('watch', watch);

// Tarefa padrão do gulp que inicia o watch e o browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync'));