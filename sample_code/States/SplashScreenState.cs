using UnityEngine;
using System.Collections;

public class SplashScreenState : GameState {

	public float displayTime;
	private float currentTime;
	public ScreenBase nextScreen;
    public ScreenBase nextScreenAndroid;

    public bool hasBeenSkipped;

	public override void OnActivate()
	{
		currentTime = 0;
	}

	public override void OnDeactivate()
	{
		

#if UNITY_ANDROID
        ScreenManager.Instance.OpenPanelWhenClosed (nextScreenAndroid);
#endif

#if UNITY_STANDALONE_WIN
        ScreenManager.Instance.OpenPanelWhenClosed(nextScreen);
#endif
    }

    public override void OnUpdate()
	{
		if (hasBeenSkipped)
			currentTime = displayTime;

		//Debug.Log ("In Splash State");
		currentTime += Time.deltaTime;


        if (currentTime >= displayTime) {
#if UNITY_ANDROID
            StateManager.Instance.SetState(typeof(RegistrationState));
#endif

#if UNITY_STANDALONE_WIN
            StateManager.Instance.SetState(typeof(AttractState));
#endif
        }
    }


}
