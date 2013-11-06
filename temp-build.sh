#!/bin/bash
#
# Copyright (c) 2012-2013 Kelly McCauley
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# Temporary script to build the documents.  This will be replace by something
# like grunt.


. ./temp-build-functions.sh

bootstrap="${PWD}/cavea-bootstrap"
# bootstrap_less_dir="${bootstrap}/less"
less_dir="${bootstrap}/less"

work_dir="${PWD}/tmp"

target_dir="${PWD}/dist/web"
target_assets_dir="${target_dir}/assets"
target_css_dir="${target_assets_dir}/css"
target_lib_dir="${target_assets_dir}/lib"

mkdir -p $target_css_dir
mkdir -p $target_lib_dir

style_less="${work_dir}/less/cavea.less"

print_info "Removing and recreating the tmp directory."

/bin/rm -rf ${work_dir}
/bin/mkdir -p ${work_dir}/less
/bin/mkdir -p ${work_dir}/css


print_info "Building our customized version of bootstrap."

/bin/cp -a ${less_dir}/*.less ${work_dir}/less/ || croak "Unable to copy Cavea's less files from ${less_dir}/*.less to ${work_dir}/less/"


./node_modules/.bin/lessc --verbose --line-numbers=comments ${style_less} > ${work_dir}/css/cavea.css || croak "Compiling ${style_less} failed."

# print_info "Copying files into place."

/bin/cp -a ${work_dir}/css/* ${target_css_dir}/ || croak "Unable to copy generated CSS files from ${work_dir}/css/* to ${target_css_dir}/"
/bin/cp -a ${bootstrap}/dist/js/bootstrap.min.js ${target_lib_dir}/bootstrap.js || croak "Unable to copy Bootstrap JavaScript library file from ${bootstrap}/dist/js/bootstrap.min.js ${target_lib_dir}/bootstrap.js"



