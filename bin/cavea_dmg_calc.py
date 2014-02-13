#!/bin/env/python
#
# Copyright 2014 Kelly A. McCauley
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

from __future__ import print_function
import importlib


def moduleExists(moduleName):
  try:
    importlib.import_module(moduleName)
  except ImportError:
    return False
  else:
    return True
    
consoleExists = moduleExists('console')
if consoleExists:
  import console
  
dieTypeDmg = (8, 4, 2, 1)
  
def main():
  if consoleExists:
    console.clear()
  ignored = '''
  attrs = (
    (0, 0, 0, 7),
    (0, 0, 3, 2),
    (1, 0, 0, 4),
    (2, 0, 0, 1),
    (2, 0, 0, 2),
    (1, 1, 1, 1)
  )
  '''

  attrs = (
    (1, 0, 0, 0),
    (0, 1, 0, 0),
    (0, 1, 0, 0),
    (0, 0, 1, 0),
    (0, 0, 1, 0),
    (0, 0, 1, 0)
  )
  
  dmg = 0
  
  for lp in attrs:
    dmg += sum([ d[0] * d[1] for d in zip(lp, dieTypeDmg)])
    
  print(str(dmg) + ' damage')
     
  
if __name__ == '__main__':
  main()
