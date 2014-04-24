$(document).ready(function(){
    $('#set_sleep').click(SleepTimer.setButtonClicked);
    $('a[role=sleep_preselect]').click(SleepTimer.presetClicked);
});

var SleepTimer = {
    setSleep: function(minutes)
    {
        chrome.alarms.create('sleep_timer', {
            delayInMinutes: minutes
        });
    },
    notifySleepTimerSet: function (description) {
        webkitNotifications.createNotification(
            'Sleeping-Emoticon.png',  // icon url - can be relative
            'Sleep Timer',  // notification title
            'Sleep Timer set to ' + description  // notification body text
        )
    },
    presetClicked: function()
    {
        var minutes = parseInt($(this).attr('data-value'));
        var description = $(this).text();
        SleepTimer.setSleep(minutes);
        SleepTimer.notifySleepTimerSet(description);
        self.close();
    },
    setButtonClicked: function(){
        var hourValue = $('#hours').val();
        var minuteValue = $('#minutes').val();

        if(hourValue != '0' || minuteValue != '0')
        {
            hourValue = parseInt(hourValue);
            minuteValue = parseInt(minuteValue);

            var minutes = (hourValue * 60) + minuteValue;
            SleepTimer.setSleep(minutes);

            var description = '';

            if(hourValue != 0)
            {
                description += hourValue + ' Hour' + (hourValue > 1 ? 's' : '');
            }

            if(minuteValue != 0)
            {
                description += ' ' + minuteValue + ' Minutes';
            }

            SleepTimer.notifySleepTimerSet(description);
            self.close();
        }
    }
}