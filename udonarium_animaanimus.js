void((function(undefined) {
    try{
        if(location.hostname !== 'character-sheets.appspot.com'){
            window.alert('このサイトでは使用できません');
            return;
        }

        let url;
        let bloburl;
        let a;

        let oSerializer;
        let sXML;

        let playerName, characterName, level, totalExp, useExp, works, birth, tragedy ,ring, ringPos1, ringPos2, wish, appearance, otherAppearance, age, sex, height, weight;
        let abilityA, abilityB, abilityC, abilityD, abilityE, abilityF, abilityG, abilityH, abilityI;
        let skillG1, skillG2, skillG3, skillG4, skillG5, skillH1, skillH2, skillH3, skillH4, skillH5, skillI1, skillI2, skillI3, skillI4, skillI5;
        let lostPremonition, lostExplain;
        let relationMain, relationSub, relationship, conflict, otherRelation;
        let crossAnotherName, crossAnotherTiming, crossAnotherTarget, crossAnotherCost, crossAnotherEffect;
        let memoria, memoriaName = [], memoriaTarget = [], memoriaEmotionPos = [], memoriaEmotionNeg = [];
        let memoriaPartnerTarget, memoriaPartnerEmotionPos, memoriaPartnerEmotionNeg;
        let another, anotherName = [], anotherTiming = [], anotherTarget = [], anotherCost = [], anotherEffect = [];
        let soulweaponName, soulweaponRank, soulweaponTarget, soulweaponAttack, soulweaponPower, soulweaponDefence, soulweaponEffect;
        let HP, soul;
        let chatPalette;

        function makeNormalElement(eName,eAttribute,eText){
            let elem = document.createElement('data');
            elem.setAttribute(eName,eAttribute);
            elem.innerText = eText;
            return elem;
        }

        function makeResourceElement(rName,rAttribute,rText,rCurrent){
            let elem = document.createElement('data');
            elem.setAttribute('type','numberResource');
            elem.setAttribute('currentValue',rCurrent);
            elem.setAttribute(rName,rAttribute);
            elem.innerText = rText;
            return elem;
        }

        function makeNoteElement(nName,nAttribute,nText){
            let elem = document.createElement('data');
            elem.setAttribute('type','note');
            elem.setAttribute(nName,nAttribute);
            elem.innerText = nText;
            return elem;
        }

        // 変数に取り込み
        playerName = document.getElementById('base.player').value;
        characterName = document.getElementById('base.name').value;
        level = document.getElementById('base.level').value;
        totalExp = document.getElementById('base.exp.total').value;
        useExp = document.getElementById('base.exp.use').value;
        works = document.getElementById('base.works').value;
        birth = document.getElementById('base.birth').value;
        tragedy = document.getElementById('base.tragedy').value;
        ring = document.getElementById('base.ring').value;
        ringPos1 = document.getElementById('base.ringposition1').value;
        ringPos2 = document.getElementById('base.ringposition2').value;
        wish = document.getElementById('base.wish').value;
        appearance = document.getElementById('base.appearance').value;
        otherAppearance = document.getElementById('base.appearanceother').value;
        age = document.getElementById('base.age').value;
        sex = document.getElementById('base.sex').value;
        height = document.getElementById('base.height').value;
        weight = document.getElementById('base.weight').value;
        abilityA = document.getElementById('ability.a').value;
        abilityB = document.getElementById('ability.b').value;
        abilityC = document.getElementById('ability.c').value;
        abilityD = document.getElementById('ability.d').value;
        abilityE = document.getElementById('ability.e').value;
        abilityF = document.getElementById('ability.f').value;
        abilityG = document.getElementById('ability.g').value;
        abilityH = document.getElementById('ability.h').value;
        abilityI = document.getElementById('ability.i').value;
        // 後で数字だけ取り出す
        skillG1 = document.getElementById('skills.g1').value;
        skillG2 = document.getElementById('skills.g2').value;
        skillG3 = document.getElementById('skills.g3').value;
        skillG4 = document.getElementById('skills.g4').value;
        skillG5 = document.getElementById('skills.g5').value;
        skillH1 = document.getElementById('skills.h1').value;
        skillH2 = document.getElementById('skills.h2').value;
        skillH3 = document.getElementById('skills.h3').value;
        skillH4 = document.getElementById('skills.h4').value;
        skillH5 = document.getElementById('skills.h5').value;
        skillI1 = document.getElementById('skills.i1').value;
        skillI2 = document.getElementById('skills.i2').value;
        skillI3 = document.getElementById('skills.i3').value;
        skillI4 = document.getElementById('skills.i4').value;
        skillI5 = document.getElementById('skills.i5').value;

        lostPremonition = document.getElementById('lost.premonition').checked;
        lostExplain = document.getElementById('lost.explain').value;

        relationMain = document.getElementById('relation.main').checked;
        relationSub = document.getElementById('relation.sub').checked;
        relationship = document.getElementById('relation.relationship').value;
        conflict = document.getElementById('relation.conflict').value;
        otherRelation = document.getElementById('relation.other').value;

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

        HP = document.getElementById('battle.hp.total').value;
        soul = document.getElementById('battle.soul.total').value;

        chatPalette = '・気概\n{気概}AN<={格闘} 格闘\n{気概}AN<={運動} 運動\n{気概}AN<={追跡/逃走} 追跡/逃走\n{気概}AN<={威圧} 威圧\n{気概}AN<={操縦} 操縦\n・理知\n{理知}AN<={コンピュータ} コンピュータ\n{理知}AN<={医学} 医学\n{理知}AN<={隠密} 隠密\n{理知}AN<={知覚} 知覚\n{理知}AN<={教養} 教養\n・欲望\n{欲望}AN<={交渉} 交渉\n{欲望}AN<={調達} 調達\n{欲望}AN<={犯罪} 犯罪\n{欲望}AN<={自我} 自我\n{欲望}AN<={芸術} 芸術\n\n・命中判定\n(0+{攻撃値(ソウルウェポン)})AN<=7\n\n・ソウルウェポン\n{名前(ソウルウェポン)}/ランク：{ランク(ソウルウェポン)}/対象：{対象(ソウルウェポン)}/攻撃値：{攻撃値(ソウルウェポン)}/威力値：{威力値(ソウルウェポン)}/防御値：{防御値(ソウルウェポン)}/効果：{効果(ソウルウェポン)}\n\n・合体異能力\n' + crossAnotherName + '/' + crossAnotherTiming + '/' + crossAnotherTarget + '/' + crossAnotherCost + '/' + crossAnotherEffect + '\n\n・異能力';
        for(let i = 0; i < anotherName.length; i++){
            chatPalette += ('\n' + anotherName[i] + '/' + anotherTiming[i] + '/' + anotherTarget[i] + '/' + anotherCost[i] + '/' + anotherEffect[i]);
        }

        // DOMツリー作成
        let charElem = document.createElement('character');
        charElem.setAttribute('location.name','table');
        charElem.setAttribute('location.x','0');
        charElem.setAttribute('location.y','0');
        charElem.setAttribute('posZ','0');
        charElem.setAttribute('rotate','0');
        charElem.setAttribute('roll','0');

        let dataChar = makeNormalElement('name','character','');
        
        let dataImg = makeNormalElement('name','image','');
        let imgChild = document.createElement('data');
        imgChild.setAttribute('type','image');
        imgChild.setAttribute('name','imageIdentifier');
        dataImg.appendChild(imgChild);
        dataChar.appendChild(dataImg);

        let dataCommon = makeNormalElement('name','common','');
        let dataName = makeNormalElement('name','name',characterName);
        dataCommon.appendChild(dataName);
        let dataSize = makeNormalElement('name','size','1');
        dataCommon.appendChild(dataSize);
        dataChar.appendChild(dataCommon);

        let dataDetail = makeNormalElement('name','detail','');
        
        let statusElem = makeNormalElement('name','ステータス','');
        let HPElem = makeResourceElement('name','HP',HP,HP);
        statusElem.appendChild(HPElem);
        let soulElem = makeResourceElement('name','魂',soul,30);
        statusElem.appendChild(soulElem);
        let badstatusElem = makeNoteElement('name','バッドステータス','');
        statusElem.appendChild(badstatusElem);
        dataDetail.appendChild(statusElem);

        let baseElem = makeNormalElement('name','基本情報','');
        let playerNameElem = makeNormalElement('name','プレイヤー名',playerName);
        baseElem.appendChild(playerNameElem);
        let levelElem = makeNormalElement('name','レベル',level);
        baseElem.appendChild(levelElem);
        let useExpElem = makeNormalElement('name','使用経験点',useExp);
        baseElem.appendChild(useExpElem);
        let totalExpElem = makeNormalElement('name','累計経験点',totalExp);
        baseElem.appendChild(totalExpElem);
        if(lostPremonition){
            let lostPremonitionElem = makeNormalElement('name','死の予感','あり');
            baseElem.appendChild(lostPremonitionElem);
        }else{
            let lostPremonitionElem = makeNormalElement('name','死の予感','なし');
            baseElem.appendChild(lostPremonitionElem);
        }
        let lostExplainElem = makeNormalElement('name','喪失',lostExplain);
        baseElem.appendChild(lostExplainElem);
        dataDetail.appendChild(baseElem);

        let lifePathElem = makeNormalElement('name','ライフパス','');
        let worksElem = makeNormalElement('name','ワークス',works);
        lifePathElem.appendChild(worksElem);
        let birthElem = makeNormalElement('name','出自',birth);
        lifePathElem.appendChild(birthElem);
        let tragedyElem = makeNormalElement('name','悲劇',tragedy);
        lifePathElem.appendChild(tragedyElem);
        let wishElem = makeNormalElement('name','願望',wish);
        lifePathElem.appendChild(wishElem);
        let ringPosElem = makeNormalElement('name','指輪の位置',ringPos1+ringPos2);
        lifePathElem.appendChild(ringPosElem);
        dataDetail.appendChild(lifePathElem);

        let memoriaElem = makeNormalElement('name','メモリア','');
        for(let i = 0; i < memoriaName.length; i++){
            let memoriaElemChild = makeNormalElement('name',memoriaName[i],memoriaTarget[i] + '(' + memoriaEmotionPos[i] + '/' + memoriaEmotionNeg[i] + ')');
            memoriaElem.appendChild(memoriaElemChild);
        }
        let memoriaPartnerElem = makeNormalElement('name','メモリア(パートナー)',memoriaPartnerTarget+'('+memoriaPartnerEmotionPos+'/'+memoriaPartnerEmotionNeg+')');
        memoriaElem.appendChild(memoriaPartnerElem);
        dataDetail.appendChild(memoriaElem);

        let relationElem = makeNormalElement('name','リレーション','');
        if(relationMain){
            let MainSubElem = makeNormalElement('name','主導権','主');
            relationElem.appendChild(MainSubElem);
        }else if(relationSub){
            let MainSubElem = makeNormalElement('name','主導権','従');
            relationElem.appendChild(MainSubElem);
        }else{
            let MainSubElem = makeNormalElement('name','主導権','');
            relationElem.appendChild(MainSubElem);
        }
        let relationshipElem = makeNormalElement('name','関係',relationship);
        relationElem.appendChild(relationshipElem);
        let conflictElem = makeNormalElement('name','葛藤',conflict);
        relationElem.appendChild(conflictElem);
        let otherRelationElem = makeNoteElement('name','その他の関係',otherRelation);
        relationElem.appendChild(otherRelationElem);
        dataDetail.appendChild(relationElem);

        let personalElem = makeNormalElement('name','パーソナルデータ','');
        let appearanceElem = makeNoteElement('name','特徴的な外見',appearance);
        personalElem.appendChild(appearanceElem);
        let otherAppearanceElem = makeNoteElement('name','その他の外見',otherAppearance);
        personalElem.appendChild(otherAppearanceElem);
        let ageElem = makeNormalElement('name','年齢',age);
        personalElem.appendChild(ageElem);
        let sexElem = makeNormalElement('name','性別',sex);
        personalElem.appendChild(sexElem);
        let heightElem = makeNormalElement('name','身長',height);
        personalElem.appendChild(heightElem);
        let weightElem = makeNormalElement('name','体重',weight);
        personalElem.appendChild(weightElem);
        dataDetail.appendChild(personalElem);

        let soulweaponElem = makeNormalElement('name','ソウルウェポン','');
        let soulweaponNameElem = makeNormalElement('name','名前(ソウルウェポン)',soulweaponName);
        soulweaponElem.appendChild(soulweaponNameElem);
        let soulweaponTargetElem = makeNormalElement('name','対象(ソウルウェポン)',soulweaponTarget);
        soulweaponElem.appendChild(soulweaponTargetElem);
        let soulweaponAttackElem = makeNormalElement('name','攻撃値(ソウルウェポン)',soulweaponAttack);
        soulweaponElem.appendChild(soulweaponAttackElem);
        let soulweaponPowerElem = makeNormalElement('name','威力値(ソウルウェポン)',soulweaponPower);
        soulweaponElem.appendChild(soulweaponPowerElem);
        let soulweaponDefenceElem = makeNormalElement('name','防御値(ソウルウェポン)',soulweaponDefence);
        soulweaponElem.appendChild(soulweaponDefenceElem);
        let soulweaponEffectElem = makeNoteElement('name','効果(ソウルウェポン)',soulweaponEffect);
        soulweaponElem.appendChild(soulweaponEffectElem);
        dataDetail.appendChild(soulweaponElem);

        let anotherElem = makeNormalElement('name','異能力','');
        for(let i = 0; i < anotherName.length; i++){
            let anotherDetailElem = makeNoteElement('name','異能力'+(i+1),anotherName[i]+'/'+anotherTiming[i]+'/'+anotherTarget[i]+'/'+anotherCost[i]+'/'+anotherEffect[i]);
            anotherElem.appendChild(anotherDetailElem);
        }
        dataDetail.appendChild(anotherElem);

        let crossAnotherElem = makeNormalElement('name','合体異能力','');
        let crossAnotherDetailElem = makeNoteElement('name','合体異能力',crossAnotherName+'/'+crossAnotherTiming+'/'+crossAnotherTarget+'/'+crossAnotherCost+'/'+crossAnotherEffect);
        crossAnotherElem.appendChild(crossAnotherDetailElem);
        dataDetail.appendChild(crossAnotherElem);

        let abilityElem = makeNormalElement('name','能力値','');
        let abilityAElem = makeNormalElement('name','筋力',abilityA);
        abilityElem.appendChild(abilityAElem);
        let abilityBElem = makeNormalElement('name','敏捷',abilityB);
        abilityElem.appendChild(abilityBElem);
        let abilityCElem = makeNormalElement('name','知能',abilityC);
        abilityElem.appendChild(abilityCElem);
        let abilityDElem = makeNormalElement('name','感覚',abilityD);
        abilityElem.appendChild(abilityDElem);
        let abilityEElem = makeNormalElement('name','意思',abilityE);
        abilityElem.appendChild(abilityEElem);
        let abilityFElem = makeNormalElement('name','魅力',abilityF);
        abilityElem.appendChild(abilityFElem);
        dataDetail.appendChild(abilityElem);

        let spiritElem = makeNormalElement('name','魂魄値','');
        let spiritGElem = makeNormalElement('name','気概',abilityG);
        spiritElem.appendChild(spiritGElem);
        let spiritHElem = makeNormalElement('name','理知',abilityH);
        spiritElem.appendChild(spiritHElem);
        let spiritIElem = makeNormalElement('name','欲望',abilityI);
        spiritElem.appendChild(spiritIElem);
        dataDetail.appendChild(spiritElem);

        let skillGElem = makeNormalElement('name','技能(気概)','');
        let skillG1Elem = makeNormalElement('name','格闘',skillG1.slice(-1));
        skillGElem.appendChild(skillG1Elem);
        let skillG2Elem = makeNormalElement('name','運動',skillG2.slice(-1));
        skillGElem.appendChild(skillG2Elem);
        let skillG3Elem = makeNormalElement('name','追跡/逃走',skillG3.slice(-1));
        skillGElem.appendChild(skillG3Elem);
        let skillG4Elem = makeNormalElement('name','威圧',skillG4.slice(-1));
        skillGElem.appendChild(skillG4Elem);
        let skillG5Elem = makeNormalElement('name','操縦',skillG5.slice(-1));
        skillGElem.appendChild(skillG5Elem);
        dataDetail.appendChild(skillGElem);

        let skillHElem = makeNormalElement('name','技能(理知)','');
        let skillH1Elem = makeNormalElement('name','コンピュータ',skillH1.slice(-1));
        skillHElem.appendChild(skillH1Elem);
        let skillH2Elem = makeNormalElement('name','医学',skillH2.slice(-1));
        skillHElem.appendChild(skillH2Elem);
        let skillH3Elem = makeNormalElement('name','隠密',skillH3.slice(-1));
        skillHElem.appendChild(skillH3Elem);
        let skillH4Elem = makeNormalElement('name','知覚',skillH4.slice(-1));
        skillHElem.appendChild(skillH4Elem);
        let skillH5Elem = makeNormalElement('name','教養',skillH5.slice(-1));
        skillHElem.appendChild(skillH5Elem);
        dataDetail.appendChild(skillHElem);
        
        let skillIElem = makeNormalElement('name','技能(欲望)','');
        let skillI1Elem = makeNormalElement('name','交渉',skillI1.slice(-1));
        skillIElem.appendChild(skillI1Elem);
        let skillI2Elem = makeNormalElement('name','調達',skillI2.slice(-1));
        skillIElem.appendChild(skillI2Elem);
        let skillI3Elem = makeNormalElement('name','犯罪',skillI3.slice(-1));
        skillIElem.appendChild(skillI3Elem);
        let skillI4Elem = makeNormalElement('name','自我',skillI4.slice(-1));
        skillIElem.appendChild(skillI4Elem);
        let skillI5Elem = makeNormalElement('name','芸術',skillI5.slice(-1));
        skillIElem.appendChild(skillI5Elem);
        dataDetail.appendChild(skillIElem);
        
        dataChar.appendChild(dataDetail);
        charElem.appendChild(dataChar);
        
        let chatPaletteElem = document.createElement('chat-palette');
        chatPaletteElem.setAttribute('dicebot','AnimaAnimus');
        chatPaletteElem.textContent = chatPalette;
        charElem.appendChild(chatPaletteElem);
        
        // xmlを作る
        oSerializer = new XMLSerializer();
        sXML = oSerializer.serializeToString(charElem);
        sXML = sXML.replace(/xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g,'');
        sXML = sXML.replace(/currentvalue/g,'currentValue');

        // xmlをダウンロードさせる
        blob  = new Blob([sXML]);
        url = window.URL;
        bloburl = url.createObjectURL(blob);

        a = document.createElement('a');
        a.download = 'data.xml';
        a.href = bloburl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    catch(e){
        window.alert('失敗しました\n' + e);
    }
  })());
