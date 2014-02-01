from __future__ import print_function
import importlib
#import pprint
#from collections import Counter
from collections import deque

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
  
prettyPrint = False

ds = [':d4|', ':d6|', ':d8|', ':d10']
cmt = '''
  "standard": [60, 45, 30, 20],
  "difficult": [89, 67, 45, 30],
  "very_difficult": [120, 90, 60, 40],
  "phys_attr": [120, 90, 60, 40]
'''
costTypes = {
#                  1   2   3   4
  "experimental": [12, 12, 12, 18],
  "standard": [12, 12, 12, 18],
  "difficult": [24, 24, 24, 36],
  "very_difficult": [36, 36, 36, 54],
  "phys_attr": [24, 24, 24, 36]
}

costTypeNames = ["standard", "difficult", "very_difficult"]

def add(aplp1, aplp2):
  ap = aplp1[0] + aplp2[0]
  lp = tuple([ t[0] + t[1] for t in zip(aplp1[1], aplp2[1])])
  return (ap, lp)


def costDataFor(costType):
  # print('Changing costs to: ' + repr(costType))
  
  costs = costTypes[costType]
  # print('costs: ' + repr(costs))
  
  n_d10   = costs[3]
  d10_d8  = costs[2]
  d8_d6   = costs[1]
  d6_d4   = costs[0]
  
  n_d10c  = (-n_d10,   ( 0, 0, 0, 1))
  d10_d8c = (-d10_d8,  ( 0, 0, 1,-1))
  d8_d6c  = (-d8_d6,   ( 0, 1,-1, 0))
  d6_d4c  = (-d6_d4,   ( 1,-1, 0, 0))
  
  unrolled = {
    n_d10: [
      n_d10c
    ],
    d10_d8: [
      d10_d8c,
      n_d10c
    ],
    d8_d6: [
      d8_d6c,
      d10_d8c,
      add(n_d10c, n_d10c)
    ],
    d6_d4: [
      d6_d4c,
      d8_d6c,
      add(d10_d8c, d10_d8c),
      add(d10_d8c, n_d10c),
      add(add(n_d10c, n_d10c), n_d10c)
    ]
  }
  return (costs, unrolled)


def isValid(aplp):
  if aplp[0] < 0:
    return False
  for n in aplp[1]:
    if n < 0:
      return False
  return True

def renderLP(lp):
  if prettyPrint:
    text = ''
    for t in zip(lp, ds):
      text = text + str(t[0]) + t[1]
    return text
  else:
    return repr(lp)
  
def nextPurchaseTier(ap, costData):
  tier = -1
  for x in costData[0]:
    if ap >= x:
      tier = x
      break  
  return tier
  
def purchaseRecursive(aplp, costData, depth=0):
  costs = costData[0]
  unrolled = costData[1]
  tier = nextPurchaseTier(aplp[0], costData)
  purchases = set()
  
  # pfx = ':' + repr(aplp) + ':' + str(depth) + ':' + str(tier)
      
  # print(pfx + ': Starting purchase.')
  
  if tier > 0:
    tierItems = unrolled[tier]
    # print(pfx + ': iterating thru tierItems: ' + repr(tierItems))
    
    for cost in tierItems:
      modAPLP = add(aplp, cost)
      # print(pfx + ': ' + repr(aplp) + ' + ' + repr(cost) + ' = ' + repr(modAPLP))

      if isValid(modAPLP):
        # print(pfx + ': ' + repr(modAPLP) + ' is a valid purchase.')
        
        childPurchases = purchaseRecursive(modAPLP, costData, depth + 1)
        # print(pfx + ': childPurchases: ' + repr(childPurchases))
        
        purchases.update(childPurchases)
        
      # else:
      #   print(pfx + ': ' + repr(modAPLP) + ' is an invalid purchase.')
        
  else:
    # print(pfx + ': not enough AP.')
    # purchases.append(aplp)
    # print(pfx + ': returning: ' + repr(aplp))
    return set([aplp])
    
  # print(pfx + ': returning: ' + repr(purchases))
  return purchases
  

def go(aplp, costType):

  costData = costDataFor(costType)
  # print('costData: ' + repr(costData))
  # print(':aplp              :d:t: msg')
  purchases = purchaseRecursive(aplp, costData)
    
  return purchases
  
  
  
def main():
  if consoleExists:
    console.clear()

  lp = (0, 0, 0, 0)
   
  startingAPs = [
    120
  ]
 
  for ap in startingAPs:
    for ctn in costTypeNames:
      print('- - - - - - - - - - - - - - - - - - - -')
      purchases = go((ap, lp), ctn)
      
      print("Purchasing Options for " + repr((ap, lp)) + ' at ' + ctn + ' cost:')
  
      for p in sorted(list(purchases)):
        print(repr(p[1]) + ', remainder: ' + str(p[0]))
        
      print('')

if __name__ == '__main__':
  main()
