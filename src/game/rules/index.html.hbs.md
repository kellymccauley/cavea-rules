Cavea: Rules of the Stage

Where the audience controls the stage....

# <span id="chapter-basic-mechanics">Basic Mechanics</span>
[basic mech]: #chapter-basic-mechanics

## <span id="section-dice-requirements">Dice Requirements</span>
[dice req]: #section-dice-requirements

A lot of d4, d6, d8, d10, d12, and d20 dice.


## <span id="section-level-pool">Level Pool</span>
[lp]: #section-level-pool

A Level Pool (LP) is:

*   a measurement of expertise of a skill or 
*   a measurement of physical ability.

A Level Pool consists of one or more dice, where each die in the pool is either a d4, d6, d8, d10, d12, or d20 die, and potentially a results modifier.

Examples:

<code class="lp">1:d20</code> -- A level pool consisting of a single *d20*.

<code class="lp">2:d10</code> -- A level pool consisting of two *d10*s.

<code class="lp">1:d8/1:d10</code> -- A level pool consisting of one *d8* and one *d10*.

<code class="lp">1:d4/2:d6/1:d8/3:d10/2:d12/1:d20</code> -- A level pool consisting of one *d4*, two *d6*s, one *d8*, three *d10*s, two *d12*s, and one *d20*.

<code class="lp">1:4/2:6/1:8/3:10/2:12/1:20</code> -- The same level pool as the previous example.

<code class="lp">1:d6/4:d10/+2</code> -- A level pool consisting of one *d6*, four *d10*s, and a results modifier of *+2*.

(Technical: See [Level Pool Notation][lp notation] for the formal notation specification).

### <span id="section-rolling-lp">Rolling a Level Pool</span>
[roll lp]: #section-rolling-lp

The procedure for rolling a Level Pool is as follow:

1.    Gather and roll all of the dice that compose the Level Pool.
2.    Add up all of the *1*s for an unmodified total.
3.    Add and/or subtract any relevant modifiers from the unmodified total for the final result.


### <span id="section-improving-lp">Improving a Level Pool</span>
[improve lp]: #section-improving-lp

See [Skill Level Pool Advancement][skill lp advance], [Physical Attribute Level Pool Advancement][pattr lp advance], [Advancement Points][lp]



## <span id="section-advancement-points">Advancement Points</span>
[ap]: #section-advancement-points

Advancement Points (AP) are the currency used to *purchase* new skills, to increase a skill's Level Pool, and improve physical attributes.

There are two types of Advancement Points: General and Specific.  

### <span id="section-general-advancement-points">General Advancement Points</span>
[gap]: #section-general-advancement-points

The General Advancement Points (GAP) can be used to learn new skills and to increase the [Level Pools][lp] of known skills.

### <span id="section-specific-advancement-points">Specific Advancement Points</span>
[sap]: #section-specific-advancement-points

The Specific Advancement Points (SAP) can only be used to either increase the Level Pool of a specific skill or to increase the Level Pool of one of the physical attributes related to that skill.  Specific Advancement Points are gained when the dice in the Level Pool are rolled during a skill attempt.  A single SAP is gained for that skill if one or more *2*s are rolled. 

#### <span id="section-sap-gain-example">SAP Gain Example</span>
[sap example]: #section-sap-gain-example

Rayus the Swift has a <code class="lp">3:d8/2:d10/3:d20</code> LP in Moving Silently.  During his Moving Silently skill attempt, the LP roll resulted in: *7*, *8*, *2*, *6*, *9*, *2*, *14*, *11*.  Even though he stepped on a stick that snapped and gave his position away, he gained *1* SAP that he can use towards improving his Moving Silently skill or his mEn, bEn, or bAg physical attributes.




# <span id="chapter-skill-mechanics">Skill Mechanics</span>
[skill mech]: #chapter-skill-mechanics


## <span id="section-skill-attributes">Skill Attributes</span>
[sattr]: #section-skill-attributes

* Name 
* Description
* [Level Pool][skill lp]
* [Related Physical Attributes][skill pattr]
* [Specialization Requirements](#section-skill-specialization-requirements)
* Prerequisites
* Initial Advancement Cost
* Initial Learning Methods
* Improvement Methods
* Progression requirements
* Categorizations
* Genres
* Alternate Skill and/or Physical Attribute



### <span id="section-skill-level-pool">Skill Level Pool</span>
[skill lp]: #section-skill-level-pool

A skill's [Level Pool][lp] (LP) is the measurement of expertise of that skill.

Example

Rayus the Swift is renown for dodging arrows.  His dodging skill level pool is two *d4*s, three *d8*s, one *d10*, and four *d12*s (abbreviated as: <code class="lp">2:d4/3:d8/1:10/4:d12</code>).  Old Gran has arthritis in her hips and cannot move very quickly but is a culinary expert.  Her dodge skill LP is two *d20*s with a results modifier of *-1*, due to the arthritis  (abbreviated as: <code class="lp">2:d20/-1</code>) and her food preparation skill level pool is <code class="lp">4:d4/4:d6/2:d8/2:d10/1:d12</code>.

See [Level Pool Notation](#section-level-pool-notation).

### <span id="section-skill-related-physical-attributes">Related Physical Attributes</span>
[skill pattr]: #section-skill-related-physical-attributes

Unlike other games, the [gamer][]'s choice of skills for their character and spending of [Specific Advancement Points][sap] dictates the character's physical attributes.

<span id="physical-attribute-mst">Mental Strength</span> (mSt) represents the character's intelligence, learning capacity, and overall mental capability.

[mSt]: #physical-attribute-mst

<span id="physical-attribute-men">Mental Endurance</span> (mEn) represents the character's will power and mental focus and stamina.

[mEn]: #physical-attribute-men

<span id="physical-attribute-mag">Mental Agility</span> (mAg) represents the character's speed of memory recall, the speed at which learning occurs, and the level of complexity of new topics that can be learned.

[mAg]: #physical-attribute-mag

<span id="physical-attribute-bst">Body Strengthe</span> (bSt) represents the character's brawn, hardiness, durability, and muscle strength.

[bSt]: #physical-attribute-bSt

<span id="physical-attribute-ben">Body Endurance</span> (bEn) represents the character's fortitude and stamina.

[bEn]: #physical-attribute-bEn

<span id="physical-attribute-bag">Body Agility</span> (bAg) represents the character's balance, dexterity, and nimbleness.

[bAg]: #physical-attribute-bAg

Similar to skills, Level Pools are used as a measure of each of the above physical attributes.


### <span id="section-skill-specialization-requirements">Specialization Requirments</span>
[skill spec req]: #section-skill-specialization-requirements






## <span id="section-skill-attempt">Skill Attempt</span>
[skill attempt]: #section-skill-attempt

A gamer [rolls the skill's Level Pool][roll lp] when attempting to use the skill.  The gamer then adds up all of the *1*s, and adds and/or subtracts any relevant modifiers.  If every rolled die in the Level Pool results in a *1*, then *2* Specific Advancement Points are gained for that skill.

### <span id="section-skill-attempt-opposed">Opposing/Opposed Skill Attempt</span>
[opposed skill attempt]: #section-skill-attempt-opposed

If the skill attempt is opposing/is opposed by a skill attempt by a separate entity then the total result is compared with the opposing/opposed total result.  The highest result wins.  The difference between the highest and lowest total results may dictate the type and/or scale of the results.  E.g. Defending against a sword attack with a small shield.

### <span id="section-skill-attempt-unopposed">Unopposed Skill Attempt</span>
[unopposed skill attempt]: #section-skill-attempt-unopposed

If the skill attempt is unopposed then the GM compares the total result with a predetermined target number.  If the total result is higher than or equal to the target number then the skill attempt is successful.  If the total result is lower than the target number then the skill attempt failed.  The difference between the total result and the target number may dictate the type and/or scale of the success or failure.

### <span id="section-skill-attempt-combining-skills">Combining Skills</span>
[combined skill attempt]: #section-skill-attempt-combining-skills

The GM may decide that more the one skill is needed to accomplish a single task.  To combine multiple skills, the Level Pools for the each skill are rolled and all of the *1*s are added together forming a single result.

### <span id="section-skill-attempt-teamwork">Teamwork</span>
[teamwork]: #section-skill-attempt-teamwork

Similar to [combining skills](#section-skill-attempt-combining-skills), the GM may decide that teamwork is needed to accomplish a single task.  To attempt a skill as a team, each gamer rolls the Level Pool for their character's skill and all of the *1*s are added together forming a single result.

## <span id="section-skill-acquirement">Skill Acquirement</span>
[getting skills]: #section-skill-acquirement

Skills are acquired during the character creation process and while playing the character.

### <span id="section-skill-acquirement-character-creation">Acquirement During Character Creation</span>
[getting skills at char creation]: #section-skill-acquirement-character-creation

A character's fundamental set of skills are acquired through the early adolescent phase of the character creation process.  Fundamental skills are improved and new skills are acquired through the later adolescent phase of the character creation process.  Depending on the setting, groups of skills can be acquired during the apprenticeship and advanced education phase of the character creation process.

### <span id="section-skill-acquirement-character-play">Acquirement During Character Play</span>
[getting skills during play]: #section-skill-acquirement-character-play

Skills are acquired as the character is played.  General Advancement Points are used to *purchase* skills.


## <span id="section-skill-improvement">Skill Improvement</span>
[skill improvement]: #section-skill-improvement

### <span id="section-skill-lp-advancement">Skill Level Pool Advancement</span>
[skill lp advance]: #section-skill-lp-advancement

<table id="table-normal-skill-lp-die-ap-cost">
    <caption>Normal Skill Level Pool Die Advancement Point Cost Table</caption>
    <thead>
        <tr><th>From</th> <th>To</th> <th>Advancement Point Cost</th></tr>
    </thead>
    <tbody>
        <tr><td>None</td> <td>d20</td>  <td>10 if not specified by skill</td></tr>
        <tr><td>d20</td>  <td>d12</td>  <td>15</td></tr>
        <tr><td>d12</td>  <td>d10</td>  <td>20</td></tr>
        <tr><td>d10</td>  <td>d8</td>   <td>30</td></tr>
        <tr><td>d8</td>   <td>d6</td>   <td>45</td></tr>
        <tr><td>d6</td>   <td>d4</td>   <td>60</td></tr>
    </tbody>
</table>

[tbl norm skill lp ap cost]: #table-normal-skill-lp-die-ap-cost

### <span id="section-related-physical-attributes-lp-advancement">Related Physical Attribute Level Pool Advancement</span>
[skill related pattr]: #section-related-physical-attributes-lp-advancement

See [Physical Attribute Level Pool Advancement](#section-physical-attributes-lp-advancement)






# <span id="chapter-physical-attribute-mechanics">Physical Attribute Mechanics</span>
[pattr mech]: #chapter-physical-attribute-mechanics

## <span id="section-physical-attributes-lp-advancement">Physical Attribute Level Pool Advancement</span>
[pattr lp advance]: #section-physical-attributes-lp-advancement

All physical attributes start out with a <code class="lp">1:d20</code> LP.

<table id="table-related-physical-attribute-lp-die-ap-cost">
    <caption>Related Physical Attribute Level Pool Die Advancement Point Cost Table</caption>
    <thead>
        <tr><th>From</th> <th>To</th>   <th>Advancement Point Cost</th></tr>
    </thead>
    <tbody> 
        <tr><td>None</td> <td>d20</td>  <td>30</td></tr>
        <tr><td>d20</td>  <td>d12</td>  <td>30</td></tr>
        <tr><td>d12</td>  <td>d10</td>  <td>40</td></tr>
        <tr><td>d10</td>  <td>d8</td>   <td>60</td></tr>
        <tr><td>d8</td>   <td>d6</td>   <td>90</td></tr>
        <tr><td>d6</td>   <td>d4</td>   <td>120</td></tr>
    </tbody>
</table>

[tbl norm pattr lp ap cost]: #table-related-physical-attribute-lp-die-ap-cost

## <span id="section-health-and-damage-mechanics">Health and Damage Mechanics</span>
[hnd mech]: #section-health-and-damage-mechanics


For each die in the mSt, mEn, mAg, bSt, bEn, and bAg Level Pools, look up the Health Point value for the type of die in the following table and add the value to the character's Health Point total.

<table id="table-lp-die-to-hp">
    <caption>Level Pool Die to Health Points Table</caption>
    <thead>
        <tr><th>Die</th> <th>Health Points</th></tr>
    </thead>
    <tbody>
        <tr><td>d20</td>   <td>1</td></tr>
        <tr><td>d12</td>   <td>3</td></tr>
        <tr><td>d10</td>   <td>4</td></tr>
        <tr><td>d8</td>    <td>6</td></tr>
        <tr><td>d6</td>    <td>9</td></tr>
        <tr><td>d4</td>   <td>12</td></tr>
    </tbody>
</table>

[tbl lp die to hp]: #table-lp-die-to-hp

Example:

        mSt:  1:d8/2:d12/1:d20
        mEn:  1:d12/4:d20
        mAg:  2:d10/2:d12/1:d20
        bSt:  2:d6/1:d10/2:d12/1:d20
        bEn:  3:d6/2:d12/2:d20
        bAg:  1:d4/2:d6/4:d20
        
        6 + (2 * 3) + 1
        3 + 4
        (2 * 4) + (2 * 3) + 1
        (2 * 6) + 4 + (2 * 3) + 1
        (3 * 9) + (2 * 3) + 2
        12 + (2 * 9) + 4
        = 127 Health Points


# <span id="appendix-notations-and-conventions">Notations and Conventions</span>
[notation and conventions]: #appendix-notations-and-conventions

## <span id="section-level-pool-notation">Level Pool Notation</span>
[lp notation]: #section-level-pool-notation

Formal specification:

    |                   := or
    [content]           := "content" is optional
    {content}...        := repeat "content"
    [content]...        := repeat optional "content"
    
    {count}             := 1, 2, 3, ...
    {result modifier}   := {+|-}{number}
    {die type}          := [d]4|[d]6|[d]8|[d]10|[d]12|[d]20
    {dice group}        := {count}:{die type}
    
    {level pool}        := {dice group}[/{dice group}]...[/{result modifier}]
    

# <span id="glossary">Glossary</span>
[glossary]: #glossary

<div id="glossary-entry-game-master" class="glossary-entry">
  <span class="glossary-term">Game Master</span>
  
  <p class="glossary-definition">The person that directs and advances story.</p>
</div>
[game master]: #glossary-entry-game-master
 

<div id="glossary-entry-gamer" class="glossary-entry">
  <span class="glossary-term">Gamer</span>
  
  <p class="glossary-definition">A person that plays the role of one or more characters.  Game Masters are gamers, too.</p>
</div>
[gamer]: #glossary-entry-gamer
  

<div id="glossary-entry-health-points" class="glossary-entry">
  <span class="glossary-term">Health Points</span>
  
  <p class="glossary-definition">A measure of a character's health, where <i>0</i> indicates that the character is dead.</p>
</div>
[health points]: #glossary-entry-health-points


<!--
<div id="glossary-entry-" class="glossary-entry">
  <span class="glossary-term"></span>
  
  <p class="glossary-definition"></p>
</div>
-->


{{! vim: set filetype=markdown.mustache : }}
