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

E_CROAK=1

shopt -s expand_aliases
alias croak='go_croak "$FUNCNAME" "$LINENO" "$?"'
alias die='go_die "$FUNCNAME" "$LINENO"'
alias save_IFS='[ "${IFS:-unset}" != "unset" ] && old_IFS="${IFS}"'
alias restore_IFS='if [ "${old_IFS:-unset}" != "unset" ]; then IFS="${old_IFS}"; unset old_IFS; else unset IFS; fi'

# Croak
go_croak() {
  local default_exit_message="Error. See message above."
  local funcname="$1"
  local lineno="$2"
  local exitcode="$3"
  shift 3
  local exitmessage="${*-$default_exit_message}"

  echo >&2
  echo "${SCRIPT_NAME} CROAK: ${exitmessage}" >&2
  echo "${SCRIPT_NAME} CROAK:   Function: ${funcname}" >&2
  echo "${SCRIPT_NAME} CROAK:   Line #: ${lineno}" >&2
  echo "${SCRIPT_NAME} CROAK:   Exitcode: ${exitcode}" >&2
  echo >&2
  exit $E_CROAK
}

# die
go_die() {
  local default_exit_message="Error. See message above."
  local funcname="$1"
  local lineno="$2"
  local exitcode="$3"
  shift 3
  local exitmessage="${*-$default_exit_message}"

  echo >&2
  echo "${SCRIPT_NAME} DIE: ${exitmessage}" >&2
  echo "${SCRIPT_NAME} DIE:   Function: ${funcname}" >&2
  echo "${SCRIPT_NAME} DIE:   Line #: ${lineno}" >&2
  echo "${SCRIPT_NAME} DIE:   Exitcode: ${exitcode}" >&2
  echo >&2
  exit 1
}

# Prints an error mesage
print_error() {
  echo "${SCRIPT_NAME} ERROR: ${*}" >&2
  return 0
}

# Prints info messages if verbose is turned on
print_info() {
  echo "${SCRIPT_NAME} INFO: ${*}" >&2
  return 0
}

print_var() {
  local dout=$(declare -p ${*})
  print_info " :: ${dout:10}"
}


