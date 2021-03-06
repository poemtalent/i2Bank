export default function (money: string, event: KeyboardEvent) {
    const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if (event.key==='.' && reg.test(money+'.00')){
        money += '.';
    }else if (event.key === 'Backspace' && money.length > 0) {
        money = money.slice(0, -1);
    }else if(reg.test(money+event.key)){
        money+= event.key;
    }
    else{
        event.preventDefault();
    }
    return money;
}
