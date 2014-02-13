# Skill Mech

## Skill where a specialization _must_ be chosen

Let <i>S</i> be a skill that requires a specialization to be chosen.

* <i>S</i> is a broad categorical skill that may have very distinct and potentially unrelated knowledge bases.
* <i>S</i> does not have a level pool.
  * Advancement points cannot be spent directly on <i>S</i>.
  * <i>S</i> cannot be combined with other skills.
  * <i>S</i> cannot be enhanced by other skills.

Let <i>s<sub>1</sub></i> be a specialization of <i>S</i>.

* <i>s<sub>1</sub></i> is specific skill.
* <i>s<sub>1</sub></i> has a level pool.
  * Advancement points can be spent directly on <i>s<sub>1</sub></i>.
  * <i>s<sub>1</sub></i> may be combined with other skills.
  * <i>s<sub>1</sub></i> may be enhanced by other skills.
* <i>s<sub>1</sub></i> must not have further specializations.

Skills of this type may be candidates for splitting the specializations into separately defined general skills.


## Skill where a specialization _may_ be chosen

Let _P_ be a skill where a specialization is optional.

* _P_ is a general skill that consists of a single broad knowledge base.
* _P_ has a level pool.
  * Advancement points can be spent directly on _P_.
  * _P_ may be combined with other skills.
  * _P_ may be enhanced by other skills.
  * A specialization of _P_ enhances _P_ if the conditions of the specialization are met.

Let _p<sub>1</sub>_ be a specialization of _P_.

* _p<sub>1</sub>_ has a level pool.
  * Advancement points can be spent directly on _p<sub>1</sub>_.
* _p<sub>1</sub>_ is always combined to enhance _P_.
  * _p<sub>1</sub>_ has situation specific conditions that must apply before it may be used to enhance _P_.
  
* * *

# Mettle

Mettle is a person's physical ability to cope with difficult and demanding situations in a determined and resilient way.

## Mettle Check

Age influences a person's mettle.

                         Mettle Check    Mettle Check
                         Against Perm.   Against Death
     Age Group           Dis. Modifier   Modifier
     -----------------   -------------   -------------
     Child               +3              +2
     Young Adult         +2              +2
     Adult               +1              +1
     Middle Aged Adult    0               0
     Late Aged Adult     -1               0
     Elderly             -2              -1




A mettle check is a combined LP roll of mSt, mEn, bSt, and bEn plus/minus age modifiers.

* * *

# Damage and Injury

## Damage

To calculate how much damage a character can take before dying:

<ul>
  <li>For each core physical attribute:
    <ul>
      <li>For each die in the attribute's level pool:
        <ol>
          <li>Look up the number of damage.</li>
          <li>Add that number to the total amount of damage the character can take.</li>
        </ol>
      </li>
    </ul>
  </li>
</ul>


    Die
    Type   Damage
    ----   ------
    d4     8
    d6     4
    d8     2
    d10    1

Example:

    mSt (0, 0, 0, 7)    =  7 damage
    mEn (0, 0, 3, 2)    =  8 damage
    mAg (1, 0, 0, 4)    = 12 damage
    bSt (2, 0, 0, 1)    = 17 damage
    bEn (2, 0, 0, 2)    = 18 damage
    bAg (1, 1, 1, 1)    = 15 damage
                          ---------
                          77 damage

## Injury



                                                     [1]        [1]
                                                     Mettle     Mettle
                                                     Check      Check
                                                     Against    Against
                                                     Perm.      Death   [2]
    Injury Type    Dmg        Time to Heal [1]       Dis. TN    TN      IR
    -------------- ---------  --------------------   --------   ------- ---
    Trivial              0.1  1 day to 4 days        N/A        N/A       0
                         1                                                1
    Minor                2    3 days to 7 days       N/A        N/A       2
    Moderate             4    5 days to 21 days      N/A        N/A       3
    Significant          8    19 days to 56 days      1          0        4
    Serious             16    54 days to 98 days      2          1        5
    Critical            32    90 days to 168 days     4          2        6
    Catastrophic        64    150 days to 672 days    8          4        7
    Oh Sh**!           128    670 days to 1825 days  10          8        8
    What the ****!     256    1820 days to 5475 days 20         16        9
                       512                                               10
                      1024                                               11
                      2048                                               12
                      4096                                               13
                      8192                                               14
                     16384                                               15
                     32768                                               16
                       ...                                              ...
                   1048576                                               21

Note: 
[1] Species Specific
[2] Injury Rating

### Damage Rating

    Suc.
    Rslt.  DR 0  DR 1  DR 1  DR 1  DR 1  DR 1  DR 1
    -----  ----  ----  ----  ----  ----  ----  ----
      1
      2
      3
      4
      5
      6
      7
      8
      9
     10



# Damage and Injury (take 2)

* head
* neck
* front
    * chest
    * abdomen
    * pelvic region
* back
    * upper back
    * lumbar region
* left side
    * upper arm
    * lower arm
    * hand
    * upper leg
    * lower leg
    * foot
* right side
    * upper arm
    * lower arm
    * hand
    * upper leg
    * lower leg
    * foot



* * *

# Combat

## Melee

Punches can be pulled and weapon can be controlled.  When a character makes a successful attack, the player can decided to deliver a lower amount of damage.

## Enhancer Skills

Disarm Opponent - Enhances martial arts and melee weapon skills.  Requires specialization by the enhanceable skill.

