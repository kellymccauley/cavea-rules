'use strict';
var 
    mSt, mEn, mAg, bSt, bEn, bAg
  // , 
;

/**
 * A Cavea character.
 */
function CaveaCharacter(name, mSt, mEn, mAg, bSt, bEn, bAg, gap) {
  this.name = name;
  
  /** @member {CorePhysicalAttribute} mSt Mental strength. */
  this.mSt = mSt || new CorePhysicalAttribute('Mental Strength', 'mSt', 0, new LevelPool());
  
  /** @member {CorePhysicalAttribute} mEn Mental endurance. */
  this.mEn = mEn || new CorePhysicalAttribute('Mental Endurance', 'mEn', 0, new LevelPool());
  
  /** @member {CorePhysicalAttribute} mAg Mental agility. */
  this.mAg = mAg || new CorePhysicalAttribute('Mental Agility', 'mAg', 0, new LevelPool());
  
  /** @member {CorePhysicalAttribute} bSt Body strength. */
  this.bSt = bSt || new CorePhysicalAttribute('Body Strength', 'bSt', 0, new LevelPool());
  
  /** @member {CorePhysicalAttribute} bEn Body endurance. */
  this.bEn = bEn || new CorePhysicalAttribute('Body Endurance', 'bEn', 0, new LevelPool());
  
  /** @member {CorePhysicalAttribute} bAg Body agility. */
  this.bAg = bAg || new CorePhysicalAttribute('Body Agility', 'bAg', 0, new LevelPool());

  /** @member {integer} General advancement points. */
  this.gap = gap || 0;
  
}



/**
 * Core Physical Attribute
 */
function CorePhysicalAttribute(name, abbreviation, spentAP, levelPool) {
  /** @member {string} name The attribute's name. */
  this.name = name;
  
  /** @member {string} abbreviation The attribute's abbreviation. */
  this.abbreviation = abbreviation;
  
  /** @member {integer} spentAP The number of advancement points spent on this attribute. */
  this.spentAP = spentAP;

  /** @member {LevelPool} levelPool The attribute's level pool. */
  this.levelPool = levelPool;
  
}



/**
 * Skill
 */
function Skill(name) {
  /** @member {string} name The name of the skill. */
  this.name = name;

  /** @member {integer} Specific advancement points. */
  this.sap = sap || 0;
  
  /** @member {integer} spentAP The number of advancement points spent on this skill. */
  this.spentAP = spentAP;

  /** @member {LevelPool} levelPool The attribute's level pool. */
  this.levelPool = levelPool;
  
  /** @member {string} specializationOf The name of the categorical or general skill. */
  this.specializationOf = specializationOf;
}


/**
 * Level Pool.
 */
function LevelPool(d4, d6, d8, d10, resultModifiers) {
  /** @member {integer} d4 The number of 4 sided dice. */
  this.d4 = d4 || 0;

  /** @member {integer} d6 The number of 6 sided dice. */
  this.d6 = d6 || 0;

  /** @member {integer} d8 The number of 8 sided dice. */
  this.d8 = d8 || 0;

  /** @member {integer} d10 The number of 10 sided dice. */
  this.d10 = d10 || 0;

  /** @member {Array<LPResultModifier>} resultModifiers An array of result modifiers. */  
  this.resultModifiers = resultModifiers || [];
}


/**
 * Level pool result modifier.
 */
function LPResultModifier(modifier, note) {
  /** @member {integer} The LP result modifier. */
  this.modifier = modifier || 0;
  
  /** @member {string} Notes pertaining to the LP modifier. */
  this.note = note;
  
}
