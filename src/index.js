import yarncleanDefault from "./yarnclean.raw";
import exec from "gulp-exec";
import gulp from "gulp";
import through from "through2";
import fs from "fs";
import path from "path";


export function writeYarncleanFile( buildFolder, entries ) {
    fs.writeFileSync(
        path.join( buildFolder, ".yarnclean" ),
        [ yarncleanDefault ].concat( entries ).join( "\n" )
    );
}


export function install( buildFolder, entries = [] ) {
    return gulp.src( "" )
        .pipe( through.obj( ( chunk, enc, cb ) => {
            writeYarncleanFile( buildFolder, entries );
            cb( null, chunk );
        } ) )
        .pipe( exec( `cd ${buildFolder} && yarn install --production` ) );
}

export default install;
