const plumber = require('gulp-plumber');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const notify = require('gulp-notify');
const mqpacker = require('css-mqpacker');
const perfectionist = require('perfectionist');
const csso = require('postcss-csso');
const gulpif = require('gulp-if');
const cssDeclarationSorter = require('css-declaration-sorter');
const tildeImporter = require('node-sass-tilde-importer');
const config = require('../config');

const processors = [
  autoprefixer({
    cascade: false
  }),
  mqpacker({
    sort: true,
  }),
];

gulp.task('sass', ['sass-lint'], () =>
  gulp
    .src([
      `${config.src.sass}/*.{scss,sass}`,
      `!${config.src.sass}/vendors/*.scss`,
      `!${config.src.sass}/_bootstrap-custom.scss`,
      `!${config.src.sass}/_materialize-custom.scss`,
    ])
    .pipe(gulpif(config.development(), sourcemaps.init()))
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(
      sass({
        outputStyle: config.getCssOutput(),
        importer: tildeImporter,
      })
    )
    .pipe(
      gulpif(
        config.getCssOutput() === 'expanded',
        postcss([
          cssDeclarationSorter({order: 'smacss'}),
          perfectionist({
            cascade: false,
            colorShorthand: false,
            indentSize: 2,
            maxSelectorLength: false,
            maxAtRuleLength: false,
            maxValueLength: false,
          }),
        ])
      )
    )
    .pipe(postcss(processors))
    .pipe(gulpif(config.getCssOutput() === 'compressed', postcss(csso)))
    .pipe(gulpif(config.development(), sourcemaps.write('.')))
    .pipe(gulp.dest(config.dest.css))
);

gulp.task('sass:watch', () => {
  gulp.watch(`${config.src.sass}/**/*.{scss,sass}`, ['sass']);
});
