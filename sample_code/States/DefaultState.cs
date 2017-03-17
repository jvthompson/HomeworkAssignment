using UnityEngine;
using System.Collections;

public class DefaultState : GameState {

	public ScreenBase screen;

	public override void OnActivate()
	{
		AudioManager.Instance.Play ("Button03");
		ScreenManager.Instance.OpenPanel (screen);
	}
	
	public override void OnDeactivate()
	{
		
	}
	
	public override void OnUpdate()
	{
		Debug.Log ("In Default State");
	}
}
