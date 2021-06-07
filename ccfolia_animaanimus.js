void((function(undefined) {
    try{
        if(location.hostname !== 'character-sheets.appspot.com' && location.hostname !== 'www.character-sheets.appspot.com'){
            window.alert('このサイトでは使用できません');
            return;
        }
        let obj = {'kind':'character','data':{}};
        let str;

        let url = location.href;
        let playerName, characterName, ring, ringPos1, ringPos2;
        let abilityG, abilityH, abilityI;
        let skillG1, skillG2, skillG3, skillG4, skillG5, skillH1, skillH2, skillH3, skillH4, skillH5, skillI1, skillI2, skillI3, skillI4, skillI5;
        let lostPremonition, lostExplain;
        let crossAnotherName, crossAnotherTiming, crossAnotherTarget, crossAnotherCost, crossAnotherEffect;
        let memoria, memoriaName = [], memoriaTarget = [], memoriaEmotionPos = [], memoriaEmotionNeg = [];
        let memoriaPartnerTarget, memoriaPartnerEmotionPos, memoriaPartnerEmotionNeg;
        let another, anotherName = [], anotherTiming = [], anotherTarget = [], anotherCost = [], anotherEffect = [];
        let soulweaponName, soulweaponRank, soulweaponTarget, soulweaponAttack, soulweaponPower, soulweaponDefence, soulweaponEffect;
        let HP, soul;
        let memo;
        let chatPalette;

        // 変数に取り込み
        playerName = document.getElementById('base.player').value;
        characterName = document.getElementById('base.name').value;
        ring = document.getElementById('base.ring').value;
        ringPos1 = document.getElementById('base.ringposition1').value;
        ringPos2 = document.getElementById('base.ringposition2').value;
        abilityG = document.getElementById('ability.g').value;
        abilityH = document.getElementById('ability.h').value;
        abilityI = document.getElementById('ability.i').value;

        skillG1 = document.getElementById('skills.g1').value.slice(-1);
        skillG2 = document.getElementById('skills.g2').value.slice(-1);
        skillG3 = document.getElementById('skills.g3').value.slice(-1);
        skillG4 = document.getElementById('skills.g4').value.slice(-1);
        skillG5 = document.getElementById('skills.g5').value.slice(-1);
        skillH1 = document.getElementById('skills.h1').value.slice(-1);
        skillH2 = document.getElementById('skills.h2').value.slice(-1);
        skillH3 = document.getElementById('skills.h3').value.slice(-1);
        skillH4 = document.getElementById('skills.h4').value.slice(-1);
        skillH5 = document.getElementById('skills.h5').value.slice(-1);
        skillI1 = document.getElementById('skills.i1').value.slice(-1);
        skillI2 = document.getElementById('skills.i2').value.slice(-1);
        skillI3 = document.getElementById('skills.i3').value.slice(-1);
        skillI4 = document.getElementById('skills.i4').value.slice(-1);
        skillI5 = document.getElementById('skills.i5').value.slice(-1);

        lostPremonition = document.getElementById('lost.premonition').checked;
        lostExplain = document.getElementById('lost.explain').value;

        crossAnotherName = document.getElementById('crossanother.name').value;
        crossAnotherTiming = document.getElementById('crossanother.timing').value;
        crossAnotherTarget = document.getElementById('crossanother.target').value;
        crossAnotherCost = document.getElementById('crossanother.cost').value;
        crossAnotherEffect = document.getElementById('crossanother.effect').value;

        memoria = document.getElementById('memoria').getElementsByTagName('tbody')[0].children;
        for(let i = 0; i < memoria.length; i++){
            memoriaName[i] = memoria[i].children[0].firstElementChild.value;
            memoriaTarget[i] = memoria[i].children[1].firstElementChild.value;
            memoriaEmotionPos[i] = memoria[i].children[2].lastElementChild.value;
            memoriaEmotionNeg[i] = memoria[i].children[3].lastElementChild.value;
            if(memoria[i].children[2].firstElementChild.checked){
                memoriaEmotionPos[i] += '〇';
            }else if(memoria[i].children[3].firstElementChild.checked){
                memoriaEmotionNeg[i] += '〇';
            }
        }
        memoriaPartnerTarget = document.getElementById('memoriapartner.target').value;
        memoriaPartnerEmotionPos = document.getElementById('memoriapartner.emotion.positive.value').value;
        memoriaPartnerEmotionNeg = document.getElementById('memoriapartner.emotion.negative.value').value;
        if(document.getElementById('memoriapartner.emotion.positive.check').checked){
            memoriaPartnerEmotionPos += '〇';
        }else if(document.getElementById('memoriapartner.emotion.negative.check').checked){
            memoriaPartnerEmotionNeg += '〇';
        }

        another = document.getElementById('another').getElementsByTagName('tbody')[0].children;
        for(let i = 0; i < another.length; i++){
            anotherName[i] = another[i].children[0].firstElementChild.value;
            anotherTiming[i] = another[i].children[1].firstElementChild.value;
            anotherTarget[i] = another[i].children[2].firstElementChild.value;
            anotherCost[i] = another[i].children[3].firstElementChild.value;
            anotherEffect[i] = another[i].children[4].firstElementChild.value;
        }

        soulweaponName = document.getElementById('soulweapon.name').value;
        soulweaponRank = document.getElementById('soulweapon.rank').value;
        soulweaponTarget = document.getElementById('soulweapon.target').value;
        soulweaponAttack = document.getElementById('soulweapon.attack').value;
        soulweaponPower = document.getElementById('soulweapon.power').value;
        soulweaponDefence = document.getElementById('soulweapon.defence').value;
        soulweaponEffect = document.getElementById('soulweapon.effect').value;

        HP = parseInt(document.getElementById('battle.hp.total').value, 10);
        soul = parseInt(document.getElementById('battle.soul.total').value, 10);

        memo = 'PL：' + playerName + '\n';
        for(let i = 0; i < memoriaName.length; i++){
            memo += memoriaName[i] + '/' + memoriaTarget[i] + '(' + memoriaEmotionPos[i] + '/' + memoriaEmotionNeg[i] + ')\n';
        }
        memo += memoriaPartnerTarget + '(' + memoriaPartnerEmotionPos +'/' +memoriaPartnerEmotionNeg + ')\n';
        memo += soulweaponName + '/' + soulweaponRank + '/' + soulweaponTarget + '/' + soulweaponAttack + '/' + soulweaponPower + '/' + soulweaponDefence + '/' + soulweaponEffect + '\n';
        memo += '指輪：' + ringPos1 + ringPos2;
        if(lostPremonition){
            memo += '喪失：' + lostExplain;
        }

        chatPalette = crossAnotherName + '/' + crossAnotherTiming + '/' + crossAnotherTarget + '/' + crossAnotherCost + '/' + crossAnotherEffect;
        for(let i = 0; i < anotherName.length; i++){
            chatPalette += ('\n' + anotherName[i] + '/' + anotherTiming[i] + '/' + anotherTarget[i] + '/' + anotherCost[i] + '/' + anotherEffect[i]);
        }
        chatPalette += '\n:耐久力-\n:魂-\n{気概}AN<={格闘} 格闘\n{気概}AN<={運動} 運動\n{気概}AN<={追跡/逃走} 追跡/逃走\n{気概}AN<={威圧} 威圧\n{気概}AN<={操縦} 操縦\n{理知}AN<={コンピュータ} コンピュータ\n{理知}AN<={医学} 医学\n{理知}AN<={隠密} 隠密\n{理知}AN<={知覚} 知覚\n{理知}AN<={教養} 教養\n{欲望}AN<={交渉} 交渉\n{欲望}AN<={調達} 調達\n{欲望}AN<={犯罪} 犯罪\n{欲望}AN<={自我} 自我\n{欲望}AN<={芸術} 芸術';

        // オブジェクトの構築
        obj.data.name = characterName;
        obj.data.initiative = 0;
        obj.data.externalUrl = url;
        obj.data.memo = memo;
        obj.data.status = [{'label':'耐久力','value': HP,'max':HP}, {'label':'魂', 'value':soul, 'max':30},{'label':'ダイス増加','value':0,'max':10}];
        obj.data.params = [
            {'label':'武器','value':soulweaponAttack},
            {'label':'気概','value':abilityG},
            {'label':'格闘','value':skillG1},
            {'label':'運動','value':skillG2},
            {'label':'追跡/逃走','value':skillG3},
            {'label':'威圧','value':skillG4},
            {'label':'操縦','value':skillG5},
            {'label':'理知','value':abilityH},
            {'label':'コンピュータ','value':skillH1},
            {'label':'医学','value':skillH2},
            {'label':'隠密','value':skillH3},
            {'label':'知覚','value':skillH4},
            {'label':'教養','value':skillH5},
            {'label':'欲望','value':abilityI},
            {'label':'交渉','value':skillI1},
            {'label':'調達','value':skillI2},
            {'label':'犯罪','value':skillI3},
            {'label':'自我','value':skillI4},
            {'label':'芸術','value':skillI5}
        ];
        obj.data.commands = chatPalette;

        str = JSON.stringify(obj);
        let listener = function(e){
            e.clipboardData.setData('text/plain', str);
            e.preventDefault();
            document.removeEventListener('copy',listener);
        };
        document.addEventListener('copy', listener);
        document.execCommand('copy');
    }catch(e){
        window.alert('失敗しました\n' + e);
    }
})());