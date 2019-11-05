import React, { useState, useEffect } from 'react';
import "./home.scss";
import { DropdownToggle, DropdownMenu, DropdownItem, Input, InputGroup, InputGroupButtonDropdown } from 'reactstrap';
import { Container, Row, Col, Button, Label } from 'reactstrap';


import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { changeDropdownVisibility } from "../../redux/actions/changedropdownvisibility";
import { changeSettingInput } from "../../redux/actions/changesetting";
import {changeLevelInput } from "../../redux/actions/changelevel";
import {changeThemeInput } from "../../redux/actions/changetheme";

import {makeCampaign } from "../../redux/actions/makecampaign";
import { makeAjax } from "../../redux/actions/makeajax";

let x = 0;


const mapStateToProps = state => {
    return { 
        dropdownOpen: state.ui.dropdownVisibility,
        settingText: state.ui.settingTextInput,
        levelText: state.ui.levelTextInput,
        themeText: state.ui.themeTextInput,
        monsters: state.ajax.monsters,
        campaign: state.ajax.campaign
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({ 
    changeDropdownVisibility, changeSettingInput, changeLevelInput, changeThemeInput, makeAjax, makeCampaign
}, dispatch);

function Home(props) {
    function toggle(e) {
   
        if (e.target.className == "settings dropdown-toggle btn btn-secondary") {
            
            props.changeDropdownVisibility("setting");
        } else if (e.target.className == "levels dropdown-toggle btn btn-secondary") {
            props.changeDropdownVisibility("level");
        } else if (e.target.className == "theme dropdown-toggle btn btn-secondary") {
            props.changeDropdownVisibility("theme");
        }

        
    }



    function handleDropdownClick(e) {
            let target = e.target.className;

            if (e.target.className == "settings dropdown-item") {
                props.changeSettingInput(e.target.textContent);
                props.changeDropdownVisibility("setting");
            } else if (e.target.className == "levels dropdown-item") {
                props.changeLevelInput(e.target.textContent);
                props.changeDropdownVisibility("level");
            } else if (e.target.className == "theme dropdown-item") {
                props.changeThemeInput(e.target.textContent);
                props.changeDropdownVisibility("theme");
            }
       
      
    }

    useEffect(() => {
        props.makeAjax("", true, "/getMonsters")
      let target = document;
        target.addEventListener("click", offClick)
    }, []);

    function offClick(e) {
      if (
          e.target.className !== "settings dropdown-toggle btn btn-secondary" && e.target.className !== "settings dropdown-item"
          && e.target.className !== "levels dropdown-toggle btn btn-secondary" && e.target.className !== "levels dropdown-item"
          && e.target.className !== "theme dropdown-toggle btn btn-secondary" && e.target.className !== "theme dropdown-item"
        ) {
            props.changeDropdownVisibility("body");
        }     
    }

    function displayMonsters(target) {

        let monster = ``;
      for (var property in target) {
        
            if (property !== "undefined" && property !== "_id" && property !== "url" && property !== undefined  && property !== "index" 
            && property !== null && property !== "challenge_rating" && property !== "" && property !== " ") {
                if (target[property] !== null && target[property] !== undefined && target[property] !== ""  )
                    if (typeof target[property] == 'object') {
                        
                        
                        monster += `\n`
                        monster += `<span class="headerProperty">\n` + property.replace("_", " ") + `: </span>`;
                        target[property].forEach((v, i) => {
                           
                            for (var property2 in v) {
                                monster += `<span class="property">\n` + property2.replace("_", " ")  + `: </span>` + v[property2]
                                
                            }
                            if (i !== target[property].length-1) {
                                monster += `\n`
                            }
                           
                           
                        })
                    } else {
                        monster += `<span class="property">\n` + property.replace("_", " ")  + `: </span>` + target[property]
                    }
                  
            }
        
        } 
        monster = `<div class="divider"></div>` + monster
        monster = `<pre class="monster">` + monster + `</pre>`
        monster = monster + `<div class="divider"></div>`
        return monster
    }

    function generateCampaign() {
        let campaign;
        if (props.settingText == "" || props.levelText == "" || props.themeText == "") {
            props.makeCampaign("Please fill in all of the fields to generate a campaign.")
            var target = document.getElementById("campaignText")
            target.innerHTML = "Please fill in all of the fields to generate a campaign."
        } else {
            if (props.settingText == "Snow") {
               campaign = ``;
                campaign = `
                The village of Asonard, a village of perpetual winter, borders a great salt lake that creaks and cracks as underwater currents disturb the ice capping the water's surface. If it weren't for the thick plumes of smoke originating from crude log cabins of cedar and spruce, the village would be invisible through the veil of sleeted snow that thickens the air.
                
                Only a people like the Dragonborns, their scales a natural boundary against the frost, could call this desolate place home. The villagers make a modest living by exporting animal furs, fish, and simple homewares to neighbouring towns; what makes this essential trade problematic is`

                if (props.theme == "Corruption") {
                    campaign += ` the unreasonable trade tariffs imposed by Jarl Marlox on the people.`
                } else if (props.theme == "Darkness") {
                    campaign += ` the exorbitant prices the greedy people of Asonard expect the famished neighbours to pay.`
                } else {
                    campaign += ` the rugged wilderness and the beasts within between Asonard and the closest trade hub.`
                }

                campaign += `

                Wind whistles through the gaps of massive barked logs where the animal furs that insulate the structure have succumbed to the weathered abuse of several centuries. A group of adventurers huddle together by the hearth of a raw stone fireplace within the village's one tavern. As new visitors to the village, and because visitors are a rare commodity, the locals can't help but gawk at the travellers.

                A stout man wearing a thin tunic completely unsuitable for the climate slams a pitcher of ale on the adventurers' table that no one remembers ordering. He pulls a chair that looks ill equipped to support his weight from a disused table, scraping it across the cobbled floor, and seats himself with your group.

                "This is on the house," he explains. "My name is--" unless the adventurers can understand Draconic, his name is just heard as sounds. (His name is Ar'koth). "It's not much," he says, pointing to the ale, "but it's brewed strong, and it'll keep you thin-skins feeling warm." It would be advisable for the adventurers to make a sense motive check because nothing in this village is really free.

                If the adventurers roll above 12, they know that this tavernkeep is attempting to obligate the group to perform a favour, and that the moment they consume the ale, they're essentially in this man's debt according to the culture of this village. "Drink," Ar'koth insists while filling oversized copper pitchers.

                If the group refuses to drink, he says, "It's going to go flat!" and proceeds to socially pressure the group in the manner of a salesman trying to upsell. Everyone roll will save to see if the group can resist peer pressure. If even one group member rolls below 15, the group as a whole feels the same sense of obligation due to the camaraderie of travellers.

                If the group manages to roll above 15, Ar'koth says, "I guess my usual tactics aren't going to work. Fine, I'll just say it..."

                If the group has already drank or been pressured to drink, Ar'koth says, "I'll be right back..." He returns with another pitcher of ale. By the time the group finish this second pitcher, Ar'koth says, "It's time I tell you what I'm going to be requiring of you..."`

                if (props.themeText == "Corruption") {
                    campaign += `
                    
                    Ar'koth says in a whispered voice, "The village of Asonard could be an economic beacon of prosperity, with its abundance of wildlife and crisp climate that keeps exports fresh without reliance on barbaric methods of preservation, but Jarl Marlox would rather sit on a jewel encrusted throne than see the wealth of the people end up in the peoples' hands."
                    `
                } else if (props.themeText == "Darkness") {
                    campaign += `
                    
                    "Our people depend on trade to make a living, but ever since the neighbouring merchants formed a guild, they've been bullying our trade caravans to sell at a price that only benefits the merchant's guild. Profit margins are so low it's almost not worth making the trip."
                    `
                } else {
                    campaign += `
                    
                    "Between our village and the closest trade hub is hundreds of miles of rugged terrain, which makes moving a heavy caravan there and back an arduous task in itself, but recently, caravans have started disappearing, and despite us hiring more guards to escort the goods, this has done nothing guarantee the safe return of our merchants."
                    `
                }

                campaign += `
                Before the group can respond, a loud commotion outside disturbs the solace of the evening. The party should make a listen check above 8 to discern finer details of the commotion. If the party managed to stay sober, you've earned Ar'koth's respect, and he will join you in the fight. If the party became intoxicated, Ar'koth sees the group as pawns and will continue to drink alone; the group gains a -2 or -5 penalty to attack roles depending on just how drunk they became.

                <span class="encounter">Monster encounter 1</span>`

                if (props.levelText == "0-5") {
                    campaign += displayMonsters(props.monsters.easyMonsters[0])
                } else if (props.levelText == "6-10") {
                    campaign += displayMonsters(props.monsters.mediumMonsters[0])
                } else {
                    campaign += displayMonsters(props.monsters.hardMonsters[0])
                }

                campaign += `         

                Ar'koth approaches the group and says, "Good work. If you can handle that, you can certainly handle your task. The people have put together an ample bounty should your group be successful. We will need this done sooner rather than later."

                Party is in downtime until deciding to leave on task.

                `

                if (props.themeText == "Corruption") {
                    campaign += `Jarl Marlox lives in a heavily fortified chapel that he claimed as his palace when he rose to power through intimidation, violence, and forgery of official documents. The townsfolk aren't particularly pious people, but even the less devout consider his actions to be a mocking desecration of common decency.

                    This chapel is located at the highest point of Asonard overlooking the village and its crystalline glacial waters. The journey is taxing, and on the way, the party encounters monster 2. 

                    <span class="encounter">Monster encounter 2</span>`

                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[1])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[1])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[1])
                    }
                    
                    campaign += `

                    The party approaches Marlox's palace. Brick and mortar walls reinforced with oak supports stand 12' tall around the perimeter. Atop the walls are three archers whose stats can be as low or high as needed. If the party decides to do proper reconnaissance, they'll notice there's service staff who enter the compound wearing generic crimson robes through inconspicuous wooden doors the same colour as the brickwork surrounding them. Entering the compound wearing disguises is an option.

                    Approaching the walls, the party is unable to scale them without a climber's kit or spider climb spell. The party must make a dexterity or stealth check to remain hidden from the archers. Should any party member fail, all three archers will immediately start attack rolls at the party. Initiative begins after the archers' first attacks as scaling a wall places the party in a compromised position.

                    If the party chose to sneak in by incapacitating servants, they will need to make a successful bluff, diplomacy, or intimidation check on the guard who seems perplexed to see so many new servants. If the party rolls under 8, he will attack, and two of the three archers on the walls will be able to get clear shots at the group. 

                    After the party defeats the archers atop the wall, the guard below will remain clueless about any commotion above, and they can safely enter the compound through a guard corridor connecting from the wall to the main building. 

                    After the party bluffs or defeats the door guard, they can either make dexterity checks to dodge the archers' attacks or walk without a care in the world across the grounds to the main building. 
                    Inside, a portly man sits on a high-backed chair in front of a table adorned with indulgent meats. There's enough food for a large gathering, but he sits alone. As he notices your group, either disguised or completely out of place, he says, "I don't recall sending for you."

                    Entire party rolls bluff, diplomacy, or intimidation. If wearing a disguise, party gains +6 to any of these checks. If the party fails, Jarl Marlox will immediately unroll a scroll, touch it, and summon monster 3. He will watch the party engage combat with this creature, disinterested.

                    If party succeeds check, they have the unique opportunity to use pure diplomacy to attempt to make the Jarl agree to abolishing the trade taxes. Role play this with the group and don't rely on dice rolls to see if this is successful. Remember, the Jarl is a man of greed and power. If the party fails to appeal to Marlox as a person, it's unlikely he'll just agree to "do the right thing". 

                    `

                    campaign += `<span class="encounter">Monster encounter 3</span>`

                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[2])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[2])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[2])
                    }
    
                    campaign += `
    
                    After the party kills the Jarl's summon or fails to convince him to abolish the taxes, he will attack with stats at the discretion of the DM. Upon successfully killing or convincing him, the party can explore the Jarl's compound; however, there will be guards that remain in interior rooms who do not react kindly to the players' presence in restricted areas.
                    `
                } else if (props.themeText == "Darkness") {
                    campaign += `The party escorts a merchant caravan across the road to the trade hub. The plan is to negotiate better prices for the sale of these goods; either that or flat out sabotage the merchant's guild. It's an uneventful journey until monster 2 looms in the distance. Roll a spot check. Combat.
                    `

                    campaign += `                    
                    <span class="encounter">Monster encounter 2</span>`

                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[1])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[1])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[1])
                    }

                    campaign += `

                    The group arrives in the trading district. This is when a group of robed figures wearing heavy chains of gold and an obscene amount of jewellery emerge into the clearing. It's a comical scene. The party notices the stark contrast in wealth between this group and the average commoner of this trade hub. 

                    A figure wearing even more jewellery than the others walks towards your party. "I trust you have the goods at our agreed upon price; however…" he takes out an oversized time piece, "it appears your caravan is 4 minutes late. This will, of course, result in a 15% deduction of our agreed-upon price due to the time sensitivity of this order." 

                    Monster three emerges from the figure of robes and stands beside the merchant's guild spokesperson. The group is welcome to attempt to roll persuasion, diplomacy, bluff, or intimidation to attempt to resolve this issue diplomatically. If diplomacy fails, the merchant and monster attack in together; however, the rest of the merchant's guild scatters.  `

                    campaign += `  

                    <span class="encounter">Monster encounter 3</span>`

                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[2])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[2])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[2])
                    }

                    campaign += `

                    Upon defeating the Merchant's Guild spokesperson, the caravan is able to sell its wares at the market for reasonable prices. They are also able to extort the impoverished townsfolk for additional profit in this quest, but there will be consequences in later campaigns
                    `
                } else {
                    campaign += `The party leaves Asonard to attempt to locate the monsters responsible from preventing the trade caravans from reaching the trade hub. The party makes a spot check as they approach the wreckage of several wagons that have been ransacked. If this check is successful, they notice they're not alone. 

                    If it's unsuccessful, they are ambushed while approaching the wreckage. Everyone roll initiative. The group is attacked by a group of bandits and two monsters.

                    `

                    campaign += `
                    <span class="encounter">Monster encounter 2</span>`

                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[1])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[1])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[1])
                    }

                    campaign += `
                    
                    <span class="encounter">Monster encounter 3</span>`

                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[2])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[2])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[2])
                    }

                    campaign += `

                    After successfully defeating the bandits, its discovered through search of the site that this group is actually in employ of the Jarl himself, and he was stealing, sabotaging, and killing the people he was meant to be serving.
                    `
                }

                campaign += `
                When the group returns to Ar'koth, he seems somewhat shocked to see you all. Roll wisdom. A roll above 12 makes the group realise that your party is not the first Ar'koth has sent, and the realisation is chilling. How many adventurers before you were not successful? Ar'koth is thankful, DM rolls loot, and the campaign ends by Ar'koth slamming another pitcher of beer on the player's table. "Drink up," he says. 
                `

               
                

               
                
            } else if (props.settingText == "Desert") {
                campaign = ``;
                campaign += `
                The desert city of Seratine is one of the most dangerous cities in the land, and yet, one of the safest. After the Great Wars had faded into obscurity, thousands of soldiers on both sides of the war were left without a livelihood, without a purpose. Some wandered the vast sands making their way with opportunistic lawlessness, and others became sell swords.

                The most central oasis within the sands became a natural junction, a resting place. As these former soldiers gathered, so too did merchants and service workers. Tattered opposing uniforms of red and blue lost meaning, and over time, a new uniform of purple and black emerged in the shanty town. 

                Tents became mud huts, which evolved into brick and mortar buildings that supported overhead aqueducts stemming from the oasis. The mercenaries who built Seratine managed to convert blood to riches, and it didn't matter where this blood came from, so long as it continued to flow and nourish the city.

                A group of adventurers stand at the city's center on rough stonework among a purple crowd. They're a little too conspicuous as this gathering largely caters to working mercenaries who have already been initiated and contributed a percentage of their first successful contract to the city. There's smirks and arrogant looks directed at your party.

                In front of the crowd is an elevated podium, and a formidable looking woman effortlessly climbs the waist height sheer while wearing plated armour. It's an impressive and casual display of strength that doesn't go unnoticed. The crowd begins to cheer and sound a rhythm by smashing weapons against shields and armour. This beat starts slow and becomes faster as she approaches the center of the podium before it abruptly stops, and the crowd goes dead silent.

                "Economic growth has been uncharacteristically slow this month…" she begins, "and I think I know why. I think too many of you are taking the easy contracts that don't pay as well." The crowd erupts in indignant exclamations. 

                "I know," she says, "it's not fair to blame all of you when it's likely only a handful not pulling their weight, which is why I'm opening recruitment again." 

                There's loud boos from the crowd, and a man standing at the edge of the congregation yells, "We don't need help from any outsiders!" The crowd responds by screaming in agreement and cheering.

                The woman waits with a serene expression until the outcries calm. "Needless to say, new initiates will earn the uniform, just like all of you, and if you think I'm going to make this easy, think again." There's silence as if she knew what their objections were likely to be well in advance.
                Your party is suddenly aware she's looking directly at your group and so is every other set of eyes. Truthfully, your group really only attended the meeting out of curiosity. The mercenaries around you seem to back away from your party until you're standing in a circle, completely exposed. 

                She smiles and addresses your group, "I trust you didn't come to Seratine for sightseeing." Savage laughter erupts around you. "You'll either pass or die, initiates."`

                if (props.themeText == "Corruption") {
                    campaign += `

                    "Disarm them!" The party is stripped of all weapons. Spell casters retain their components, books, etc.
                    `
                } else if (props.themeText == "Glory") {
                    campaign += `

                    "Arm them!" The party is given crude steel short swords to use and stripped of all other weapons. Spell casters retain their components, books, etc. Spellcasters can use these basic swords while casting but suffer a -5 penalty on attack rolls. 
                    `
                } else {
                    campaign += `

                    "Bind one of their arms!" The party retains all of their equipment but can no longer two-hand and their strength / dexterity is effectively halved. AC suffers a -2 penalty.
                    `
                }

                campaign += `
                Two mercenaries join their commander on the podium. They're carrying a crate that's covered in a purple sheet. The crowd parts in front of them, and they move toward the party, setting this crate down in front of the group. They fumble with something metallic until a click is heard. Everyone can roll a listen check.
                `
                campaign += `
                <span class="encounter">Monster encounter 1</span>`

                if (props.levelText == "0-5") {
                    campaign += displayMonsters(props.monsters.easyMonsters[0])
                } else if (props.levelText == "6-10") {
                    campaign += displayMonsters(props.monsters.mediumMonsters[0])
                } else {
                    campaign += displayMonsters(props.monsters.hardMonsters[0])
                }

                campaign += `
                
                After the party successfully defeats this enemy, the commander addresses your group. "I guess I made it too easy."
                `

                if (props.themeText == "Corruption") {
                    campaign += `                    
                    "Get the poles!" Long wooden poles protrude from the crowd. The ends are blunt. These poles are intended to knock the player off balance. Players must make dexterity saves above 6 to avoid being knocked prone.
                    `
                } else if (props.themeText == "Darkness") {
                    campaign += `                    
                    "Bruce!" A mountain of a man emerges from the crowd. He's so confident in his abilities that he's only wielding a bracer shield and intends to knock out your party with brute strength. 
                    `
                    
                } else {
                    campaign += `                    
                    "Get the darts!" The crowd produces blow dart guns and fires them at the feet of your group. The darts are only 1D2 damage, but there's a lot of them.
                    `
                }

                campaign += `                
                At this moment, a second crate is unlocked next to the first.
                `

                campaign += `
                <span class="encounter">Monster encounter 2</span>`

                if (props.levelText == "0-5") {
                    campaign += displayMonsters(props.monsters.easyMonsters[1])
                } else if (props.levelText == "6-10") {
                    campaign += displayMonsters(props.monsters.mediumMonsters[1])
                } else {
                    campaign += displayMonsters(props.monsters.hardMonsters[1])
                }

                campaign += `

                "You're still alive," she says, spitting. "Nevermind! If this doesn't kill you, you're one of us!"
                `

                if (props.themeText == "Corruption") {
                    campaign += `
                    The poles are replaced with spears that do 1D4 damage.
                    `

                } else if (props.themeText == "Darkness") {
                    campaign += `
                    Bruce is replaced with Sven who is wielding a mace that does 1D8 damage.
                    `

                } else {
                    campaign += `
                    The darts are replaced with arrows that do 1D4 damage.
                    `
                }

                campaign += `
                Mercenaries stand next to the third crate but don't immediately open it. Your party sees the commander make a gesture with her hands, and balls of light erupt from the crowd and land on the party. The party regains all lost hit points, even on the brink of death.
                `

                
                campaign += `
                <span class="encounter">Monster encounter 3</span>`

                if (props.levelText == "0-5") {
                    campaign += displayMonsters(props.monsters.easyMonsters[2])
                } else if (props.levelText == "6-10") {
                    campaign += displayMonsters(props.monsters.mediumMonsters[2])
                } else {
                    campaign += displayMonsters(props.monsters.hardMonsters[2])
                }

                campaign += `

                The crowd is silent. Your party stands among a scene of carnage. The commander makes another hand signal, and purple robes are presented to the group. The crowd responds by swarming the group in an embrace. 

                The player is now able to take mercenary contracts in Seratine, contribute to the city's economy, and rise through the ranks, accumulating riches and respect.`
            } else {
                campaign = ``

                campaign += `
                The dwarven city of Varrock, cradled in steep mountains of precious resources, is cursed by unattainable dreams. Imagine having that which you desire most at your fingertips, but you cannot touch it. You see, never has a land been so blessed with nature's bounty as Varrock, and yet, the shiny stones beneath the town are unreachable to mortal men.

                A group of adventurers, having heard of this city's incredible wealth, stand outside the city gates. Disappointment is all consuming. Derelict buildings, streets filled with rubbish, raggedly clothes draped over raggedly people. You never knew it was possible for a dwarf to be anything other than stout, and yet, standing in front of you is a frail looking guard holding a spear that appears to have been broken and bound back together with frayed rope.

                The guard says, "Welcome to the glorious city of Varrock!" 

                Before the party can correct him, he says, "You're wondering what makes this place glorious?"

                "Look past the slums and see the truth. Let me tell you the whole story. Our story begins with an ambitious young prospector. His name was Varrock, a hard-working miner a bit on the scrawny side for a dwarf.

                "You see, in our society, a dwarf is judged by the merits of their production. If they're a blacksmith, they'll be wanting to make higher quality work than any other armorer in the city, and if they're a miner, they'll be wanting to cart home more ore than anyone else. Every dwarf is naturally competitive, but if you're born a runt… well… it's difficult to compete with a disadvantage like that.

                "Now, Varrock wasn't the most highly regarded, that's for sure. At the end of the working day, a miner's production is weighed, tallied, and judged. And Varrock always came short, even for a dwarf"—the guard laughs at his own pun—"anyway, what Varrock lacked in strength, he made up in wisdom."

                "In an effort to remain competitive, Varrock started to experiment with clockwork machinery that he augmented with magic. What you people know as an augur was one of Varrock's earliest conceptions. Additionally, Varrock developed innovative new mining techniques that improved production to such an extent we were running out of carts, smelters were working night and day, and the townsfolk had started using precious minerals and stones as paperweights; our supply had grossly exceeded our demands.

                "But abundance is never enough for a dwarf.`

                if (props.settingText == "Corruption") {
                    campaign += `

                    "Varrock continued to tinker, and that's when the accidents started. Exploding tools, collapsed mineshafts, mysterious wounds. It got bad. Some of the older miners tried to return to the old ways, but by that point, Varrock's technology had become impossible to separate from the process. It gained… a kind of life… and became part of the mountain itself. Right now, automated machines still empty ore into overflowing carts, but we dare not collect it.
                    `
                } else if (props.settingText == "Darkness") {
                    campaign += `

                    "Varrock unearthed a noxious toxin. Maybe it was contaminants from the machinery or something else entirely, but overnight, entire fields withered and the water flowed black.
                    `
                } else {
                    campaign += `

                    "Varrock dug deeper and deeper, and that's when miners started disappearing. Fewer and fewer miners were leaving the shafts, and no body saw anything, no body heard anything, but we all knew the mines weren't safe anymore.
                    `
                }

                campaign += `                
                "As a result, a great many moved away, and overtime, we ate through our vast stockpiles until nothing remained. The mines remain closed. What you see before you is all that remains of the glory that was Varrock…"

                The party offers to help the guard, and he says, "Payment is guaranteed to be more than you can carry, assuming you can't carry a mountain."`

                if (props.themeText == "Corruption") {
                    campaign += `
                    The party approaches the mine. The relics of industry sit against a backdrop of overgrown weeds. Everyone should roll search for traps. If rolling above 10, the party notice that the rusty tools before them are shimmering and convulsing the closer the party gets. If someone rolls above a 10 arcana, they think these tools are enchanted using unstable magic, and the result is likely to be explosive.

                    Before the party can deal with this situation, a monster appears from the mines. Everyone roll initiative.                    
                    `

                    campaign += `
                    <span class="encounter">Monster encounter 1</span>`
    
                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[0])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[0])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[0])
                    }
                    
                    campaign += `
                    
                    This particular quest involves making the mine safe to use again, so the party has no choice but to deal with the volatile tools in the surrounding area, and there's a number of different ways to go about this. The disarm trap skill could be used, and on the success, the rogue would be able to collect semi valuable enchanted tools; however, failure would result in 1d8 explosion damage.

                    The dispel magic spell could be used. Intelligence or knowledge arcana could also be rolled to learn all of these tools are powered with a single crystal that acts as a transceiver of wireless power, and that removing the crystal would be effective. Alternatively, the group could fire ranged attacks at the tools, which would instantly detonate them; even a long stick could accomplish this task.

                    The group finally deals with the tools and enters the mine, which is when they notice the mine shaft itself is crisscrossed with spinning gears, wires, and the same crystals. An intelligence check above 15 results in the players learning that this infrastructure probably transmits power. Make a spot check to learn the group is not alone.

                    In front of the group is yet more enchanted equipment; it would take days to disarm all of it. Behind the group a monster appears.
                    `


                    campaign += `
                    <span class="encounter">Monster encounter 2</span>`
    
                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[1])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[1])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[1])
                    }

                    campaign += `

                    If the group decides to sabotage the power relays along the wall, the tools littering the path ahead will flash white before becoming disarmed. If the group decides to detonate them, the explosion is so great the path ahead becomes blocked, but I hear enchanted tools are particularly good at getting through rubble. Group needs to roll a will save above 5 to use the tools without becoming afflicted with a rash that slowly lowers ability scores to 0. 

                    The party makes their way through the mines. At a point where no more than 12 mine shafts intersect is a large crystal wrapped in copper wires with gears, pulleys, and capacitors clicking on and off in clockwork. 

                    A monster appears completely covered in a noxious rash.
                    `

                    campaign += `
                    <span class="encounter">Monster encounter 3</span>`
    
                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[2])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[2])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[2])
                    }

                    campaign += `

                    The group successfully disarm the central power generator, and the mine becomes quiet and tranquil. If the party collected enchanted tools, their original power depreciates, but a residual enchantment remains. If any party member was afflicted with a rash, it dissipates, and ability scores return to normal. Those afflicted with the rash will notice a mining proficiency skill seem to flow into their awareness. 
                    `
                } else if (props.themeText == "Darkness") {
                    campaign += `
                    The party approaches the mine. The relics of industry sit against a backdrop of overgrown weeds. The guard has provided the party with thick overalls and a basic respirator to protect the players against the noxious toxins that lay ahead. Every player has 1 vial of antitoxin and only one.

                    Before the party can proceed, a monster covered in black ooze attacks the party. If this creature should get close enough to touch the player, they accrue -1hp of poison damage per round.
                    `

                    campaign += `
                    <span class="encounter">Monster encounter 1</span>`
    
                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[0])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[0])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[0])
                    }

                    campaign += `

                    Upon successfully defeating this monster, the party can roll search, knowledge nature, or survival to notice a very useful feature. Some of the plants in this polluted area remain completely green and unaffected, and the ground surrounding these plants is a healthy brown as opposed to tarnished with black specks.

                    The players could come to the conclusion that these plants have resistance to this poison, and that by consuming these plants, poison resistance will increase. It's unlikely that the antitoxin will be enough to get the player through the mines.

                    The players enter the mines. There's no traps, but there is a thick river of black ooze blocking passage. The players can attempt a simple dex check, draw on the tools of their inventory, or try to construct a makeshift bridge. Should any of these attempts fail, the players fall into the ooze, and it burns through their protective gear for 1d6 damage. Players should also make a will save to see if their respirator remains intact.

                    After crossing the river, the players encounter another monster.
                    `

                    campaign += `
                    <span class="encounter">Monster encounter 2</span>`
    
                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[1])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[1])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[1])
                    }

                    campaign += `

                    Players can roll search, intelligence, heal to learn that this creature is so toxic that attempting to loot it would most definitely be deadly. The party continues through the mine to a central junction. This tunnel is less developed than the rest of the shaft in the sense that only temporary supports line the tunnel.

                    This must have been where the miners were digging from when everything went so bad. The wall is oozing blackness from a single crack. There's multiple ways to solve this quest. First, the players could attempt to plug this hole, and this would be effective. The plants with natural poison resistance would eventually spread through Varrock and cleanse what remains of the poison. And this particular passage could be permanently sealed to allow the miners access. 

                    Second, the players could attempt to dig a little deeper… and discover the source of the poison. The players open the wall. Everyone roll will save to avoid being splashed with poison. A narrow chamber opens to reveal monster 3 emanating an aura so toxic it tarnishes the earth around it. 
                    `

                    campaign += `
                    <span class="encounter">Monster encounter 3</span>`
    
                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[2])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[2])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[2])
                    }

                } else {
                    campaign += `
                    The party approaches the mine. The relics of industry sit against a backdrop of overgrown weeds. Roll a spot check above 10 to learn the party is not alone.
                    `

                    
                    campaign += `
                    <span class="encounter">Monster encounter 1</span>`
    
                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[0])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[0])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[0])
                    }

                    campaign += `

                    Roll search, intelligence, or wisdom on the slain monster to learn the enemy has a runic symbol on its body. Roll knowledge religion on this symbol to learn that the literal translation of the symbol is Varrock. Roll intelligence or wisdom on this symbol to recognise that the guard the party spoke to earlier had this symbol on his uniform, and that this symbol appears on the Varrock flag. 

                    The party enters the mine, and if they attempted to search for traps, they learned the way for clear. Upon learning this, rocks fall from the ceiling. Everyone make a dex save above 9 to avoid 1d6 damage. If anyone fails, they are knocked prone and monster 2 gains advantage.
                    `

                    campaign += `
                    <span class="encounter">Monster encounter 2</span>`
    
                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[1])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[1])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[1])
                    }


                    campaign += `

                    The players are now alert and cautious against natural hazards, but the rest of the mine appears to be well supported by metal struts, and it's in a surprisingly good state of repair. If anyone decides to make a listen check before proceeding, they hear the sound of pickaxes in the distance.

                    The party approaches a central junction. A wall 20' wide and 40' high covered in runic symbols has been cracked open with a gap wide enough to crawl inside. A small skeleton protrudes from the opening. 

                    The players can inspect this skeleton to learn it is, in fact, Varrock. It is at this point the skeleton animates wielding a pickaxe and monster 3 emerges in the opening.
                    `
                    campaign += `
                    <span class="encounter">Monster encounter 3</span>`
    
                    if (props.levelText == "0-5") {
                        campaign += displayMonsters(props.monsters.easyMonsters[2])
                    } else if (props.levelText == "6-10") {
                        campaign += displayMonsters(props.monsters.mediumMonsters[2])
                    } else {
                        campaign += displayMonsters(props.monsters.hardMonsters[2])
                    }

                    campaign += `

                    The players enter the opening. Inside are several obelisks on poles in the alignment of a 5 pointed star. They glow the same colour as the runes etched into every monster so far. Everyone make a will save above 6. On failure, that player turns on the party and must make attack rolls against the party. They are able to favour their weakest attacks, but they will continue to make attack rolls until incapacitated or until the obelisks are destroyed.

                    The party successfully disarm the corrupting effects of the obelisks.`

                }

                campaign += `

                The party returns to the guard. He simply says, "You'll be the first to witness Varrock's true glory." Players now have access to the untold riches of Varrock's mine.
                `
            }

          
            props.makeCampaign(campaign)
            var target = document.getElementById("campaignText")
            target.innerHTML = campaign

            props.changeSettingInput("");
            props.changeThemeInput("");
            props.changeLevelInput("");

           


        }
    }
  

    
    return (

        <Container>
           
            <Row >
                <Col md="6" className="mt-5">
                    {/* <Label className="labels">Collection name:</Label> */}
                    <InputGroup>
                        <Input disabled={true} type="text" name="setting" id="setting" placeholder="Select story setting" 
                        value={props.settingText}  
                        />
                        <InputGroupButtonDropdown  addonType="append" isOpen={props.dropdownOpen.setting} toggle={toggle}>
                            <DropdownToggle className="settings" caret>
                                Setting
                        </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className="settings" onClick={handleDropdownClick}>Snow</DropdownItem>   
                                <DropdownItem className="settings" onClick={handleDropdownClick}>Desert</DropdownItem>    
                                <DropdownItem className="settings" onClick={handleDropdownClick}>Mountains</DropdownItem>                  
                            </DropdownMenu>
                        </InputGroupButtonDropdown>
                    </InputGroup>
                </Col>

                <Col md="6" className="mt-5">
                    {/* <Label className="labels">Collection name:</Label> */}
                    <InputGroup>
                        <Input disabled={true} type="text" name="level" id="level" placeholder="Select player level" 
                        value={props.levelText} 
                        />
                        <InputGroupButtonDropdown  addonType="append" isOpen={props.dropdownOpen.level} toggle={toggle}>
                            <DropdownToggle className="levels" caret>
                                Level
                        </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className="levels" onClick={handleDropdownClick}>0-5</DropdownItem>   
                                <DropdownItem className="levels" onClick={handleDropdownClick}>6-10</DropdownItem>    
                                <DropdownItem className="levels" onClick={handleDropdownClick}>11-15</DropdownItem>       
                                <DropdownItem className="levels" onClick={handleDropdownClick}>16-20</DropdownItem>            
                            </DropdownMenu>
                        </InputGroupButtonDropdown>
                    </InputGroup>
                </Col>
               
            </Row>

            <Row className="mt-5 d-flex justify-content-center" >
            <Col md="6">
                    {/* <Label className="labels">Collection name:</Label> */}
                    <InputGroup>
                        <Input disabled={true} type="text" name="theme" id="theme" placeholder="Select core theme" 
                        value={props.themeText} 
                        />
                        <InputGroupButtonDropdown  addonType="append" isOpen={props.dropdownOpen.theme} toggle={toggle}>
                            <DropdownToggle className="theme" caret>
                                Theme
                        </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className="theme" onClick={handleDropdownClick}>Corruption</DropdownItem>   
                                <DropdownItem className="theme" onClick={handleDropdownClick}>Glory</DropdownItem>    
                                <DropdownItem className="theme" onClick={handleDropdownClick}>Darkness</DropdownItem>               
                            </DropdownMenu>
                        </InputGroupButtonDropdown>
                    </InputGroup>
                </Col>
            </Row>

                
            <Row className="mt-5">               
                <Col md="12">
                    <Button onClick={generateCampaign}>Generate Campaign</Button>            
                </Col>
            </Row>

            <Row className="mt-5">               
                <Col md="12">
                    <div id="campaignText"></div>         
                </Col>
            </Row>
        </Container>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
