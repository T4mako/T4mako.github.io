import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as t,c as l,a as o,b as e,d as i,e as d,f as u}from"./app-f2ab781e.js";const c={},r=e("h1",{id:"hlae-instructs",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#hlae-instructs","aria-hidden":"true"},"#"),i(" hlae instructs")],-1),v={class:"hint-container info"},m=e("p",{class:"hint-container-title"},"相关信息",-1),_=e("br",null,null,-1),q=e("br",null,null,-1),b=e("br",null,null,-1),h=e("br",null,null,-1),g={href:"https://space.bilibili.com/73115492",target:"_blank",rel:"noopener noreferrer"},T=e("br",null,null,-1),O=u(`<h2 id="一次性命令" tabindex="-1"><a class="header-anchor" href="#一次性命令" aria-hidden="true">#</a> 一次性命令</h2><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>sv_cheats                  1    //开启作弊  
sv_disablefreezecam        1  
fog_override               1    //视野更清晰  
net_graph                  0    //关闭网络参数  
mat_postprocess_enable     0    //画面优化  
mp_display_kill_assists    1    //显示助攻（0关闭）  
cl_showpos                 0  
cl_show_observer_crosshair 0    //观察时显示玩家所用准星&lt;0.否 1.好友及队友 2.所有人&gt;  
cl_spec_follow_grenade_key 2    //手雷追踪键 &lt;0.左ALT 1.左SHIFT 2.装弹键(R)&gt;  
engine_no_focus_sleep      0    //窗口失焦/在后台时不掉帧  
fps_max                    200  // 限制帧数，节省资源  
demo_pause                      //暂停demo  
mirv_cvar_unhide_all            //解除天空贴图锁定 nuke/train/inferno和dust2还需要按[或] 见&quot;键位绑定&quot;

//更换天空贴图 下面是推荐skybox 自定义skybox请自学
//sv_skyname sky_cs15_daylight01_hdr;
//sv_skyname sky_cs15_daylight03_hdr;
//sv_skyname vertigo;
//sv_skyname vertigoblue_hdr;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hlae相关设置" tabindex="-1"><a class="header-anchor" href="#hlae相关设置" aria-hidden="true">#</a> HLAE相关设置</h2><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>mirv_streams record name     &quot;C:\\hlae&quot;    //更改录制文件位置  修改
mirv_campath enabled         1            //开启镜头运动
cl_clock_correction          0            //修复demo卡顿
mirv_fix playerAnimState     1            //修复demo卡顿
mirv_fix blockObserverTarget 1            //修复炸弹安放时镜头bug
mirv_fov handlezoom enabled  1            //修复开镜不缩放bug
//mirv_loadlibrary &quot;&quot;                     //加载HLAE插件路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hud-准星-持枪" tabindex="-1"><a class="header-anchor" href="#hud-准星-持枪" aria-hidden="true">#</a> HUD 准星 持枪</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//界面(HUD)设置&lt;0.默认 1.白色 2.淡蓝色 3.蓝色 4.紫色 5.红色 6.橙色 7.黄色 8.绿色 9.淡绿色 10.粉红色&gt;
cl_hud_color             0        //颜色
cl_hud_background_alpha  0.5      //透明度
cl_radar_always_centered 1        //雷达以玩家为中心
cl_radar_scale           0.45     //雷达缩放
cl_hud_radar_scale       1        //雷达大小（0.8-1.3）
cl_radar_icon_scale_min  0.6      //雷达人物标点大小
cl_radar_rotate          1        //雷达旋转
hud_showtargetid         0        //隐藏目标id

//demo专用持枪视角参数
cl_viewmodel_shift_left_amt  &quot;0.500000&quot;
cl_viewmodel_shift_right_amt &quot;0.250000&quot;
viewmodel_fov                &quot;62&quot;
viewmodel_offset_x           &quot;2.5&quot;
viewmodel_offset_y           &quot;2&quot;
viewmodel_offset_z           &quot;-2&quot;
viewmodel_presetpos          &quot;0&quot;
viewmodel_recoil             &quot;0&quot;
cl_bob_lower_amt             &quot;5.000000&quot;
cl_bobamt_lat                &quot;0.100000&quot;
cl_bobamt_vert               &quot;0.100000&quot;
cl_bobcycle                  &quot;0.98&quot;

//demo专用准星 “可选指令”中有类Virre白色细准星的代码
cl_crosshair_drawoutline                 &quot;0.000000&quot;
cl_crosshair_dynamic_maxdist_splitratio  &quot;0.35&quot;
cl_crosshair_dynamic_splitalpha_innermod &quot;1&quot;
cl_crosshair_dynamic_splitalpha_outermod &quot;0.5&quot;
cl_crosshair_dynamic_splitdist           &quot;7&quot;
cl_crosshair_outlinethickness            &quot;0.500000&quot;
cl_crosshair_t                           &quot;0.000000&quot;
cl_crosshairalpha                        &quot;255.000000&quot;
cl_crosshaircolor                        &quot;1.000000&quot;
cl_crosshaircolor_b                      &quot;50.000000&quot;
cl_crosshaircolor_g                      &quot;250.000000&quot;
cl_crosshaircolor_r                      &quot;50.000000&quot;
cl_crosshairdot                          &quot;0.000000&quot;
cl_crosshairgap                          &quot;-0.500000&quot;
cl_crosshairgap_useweaponvalue           &quot;0&quot;
cl_crosshairsize                         &quot;3.500000&quot;
cl_crosshairstyle                        &quot;4.000000&quot;
cl_crosshairthickness                    &quot;1.000000&quot;
cl_crosshairusealpha                     &quot;1&quot;
cl_fixedcrosshairgap                     &quot;3&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="键位绑定" tabindex="-1"><a class="header-anchor" href="#键位绑定" aria-hidden="true">#</a> 键位绑定</h2><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>exec bind_default.cfg;                                  //   重置所有按键，以防键位冲突
bind h &quot;toggle cl_draw_only_deathnotices&quot;;              // H 只保留准星击杀
bind k &quot;toggle voice_enable;toggle voice_caster_enable&quot;;// K 开关语音 解说语言要手动从Tab里开启
bind v &quot;toggle crosshair&quot;;                              // V 隐藏准心
bind b &quot;toggle cl_drawhud&quot;;                             // B 隐藏所有hud包括击杀
bind n &quot;toggle cl_drawhud_force_radar 1 -1&quot;;            // N 开关雷达
bind m &quot;toggle host_timescale&quot;;                         // M 开关声音
bind U &quot;sRec&quot;;                                          // U 游戏/玩家/解说声音分离录制
mirv_exec alias sRec     &quot;sRec_on&quot;;
mirv_exec alias sRec_on  &quot;alias sRec sRec_off;snd_setmixer voip vol 0;mirv_streams record voices 1;voice_show_mute;echo {QUOTE}&gt;&gt;&gt; 游戏/玩家/解说声音分离录制已开启{QUOTE}&quot;;
mirv_exec alias sRec_off &quot;alias sRec sRec_on;snd_setmixer voip vol 0.7;mirv_streams record voices 0;echo {QUOTE}&gt;&gt;&gt; 游戏/玩家/解说声音分离录制已关闭{QUOTE}&quot;;

//───────────────────────────────────────────────────────────────────
bind i    &quot;campath&quot;                                     // I 镜头激活开关
bind o    &quot;campath_draw&quot;                                // O 镜头轨迹显示开关
mirv_exec alias campath	&quot;campath_on&quot;                    //   实现i、o两个键位绑定的功能
mirv_exec alias campath_on	&quot;mirv_campath enabled 1;alias campath campath_off;echo {QUOTE}&gt;&gt;&gt; 摄像机功能已开启√{QUOTE}&quot;
mirv_exec alias campath_off	&quot;mirv_campath enabled 0;alias campath campath_on;echo {QUOTE}&gt;&gt;&gt; 摄像机功能已关闭×{QUOTE}&quot;
mirv_exec alias campath_draw	&quot;campath_draw_on&quot;
mirv_exec alias campath_draw_on &quot;mirv_campath draw enabled 1;alias campath_draw campath_draw_off;echo {QUOTE}&gt;&gt;&gt; 摄像机路径显示已开启√{QUOTE}&quot;
mirv_exec alias campath_draw_off &quot;mirv_campath draw enabled 0;alias campath_draw campath_draw_on;echo {QUOTE}&gt;&gt;&gt; 摄像机路径显示已关闭×{QUOTE}&quot;

//───────────────────────────────────────────────────────────────────
bind -        &quot;mirv_fov 105&quot;;                             // -        更改镜头FOV至105
bind =        &quot;mirv_fov default&quot;;                         // =        恢复镜头FOV至95
bind t        &quot;sv_cheats 1;spec_mode 5;mirv_input camera&quot;;// T        镜头摆放模式 ESC退出
bind p        &quot;demo_togglepause&quot;;                         // P        切换demo暂停/继续
bind mouse3   &quot;demo_togglepause&quot;;                         // 鼠标中键 切换demo暂停/继续
bind capslock &quot;mirv_campath add&quot;;                         // Capslock 添加镜头
bind del      &quot;mirv_campath clear&quot;;                       // delete   删除所有镜头
bind F5       &quot;mirv_cmd addTick rec&quot;;                     // F5       设置当前Tick开始录制
bind F6       &quot;mirv_cmd addTick rec_end&quot;;                 // F6       设置当前Tick结束录制
bind F7       &quot;mirv_cmd print&quot;;                           // F7       打印mirv_cmd信息
bind F8       &quot;mirv_cmd clear;echo &gt;&gt;&gt; Cleared!&quot;;         // F8       清除所有mirv_cmd指令
bind F10      &quot;exec cals.cfg&quot;;                            //          自动加载cals.cfg中有关自拍杆录制的指令和提示
bind F11      &quot;exec stream.cfg&quot;;                          //          自动加载stream.cfg中有关分层录制的指令和提示
bind F12      &quot;exec ffmpeg.cfg&quot;;                          //          自动加载ffmpeg.cfg里的FFmpeg录制预设
bind ,        &quot;mirv_vpanel command DemoUIPanel BaseUI previousround&quot;;    //上一回合
bind .        &quot;mirv_vpanel command DemoUIPanel BaseUI nextround&quot;;        //下一回合
//mirv_cmd save &quot;test.xml&quot;;
//mirv_cmd load &quot;test.xml&quot;;
mirv_exec alias continue  &quot;demo_resume&quot;;
mirv_exec bind  uparrow   &quot;rec;continue&quot;;                 //↑ hlae录制开始
mirv_exec bind  downarrow &quot;rec_end;demo_pause&quot;;            //↓ hlae录制结束
mirv_exec alias rec       &quot;HlaeRecord;demo_timescale 1;mirv_snd_timescale 1;host_timescale 0;fps_max 0;mirv_streams record start;echo {QUOTE}&gt;&gt;&gt; HLAE录制开始{QUOTE}&quot;;
mirv_exec alias rec_end   &quot;host_framerate 0;host_timescale 1;fps_max 200;mirv_streams record end;echo {QUOTE}&gt;&gt;&gt; HLAE录制结束{QUOTE}&quot;;

// HLAE录制设置切换的快捷指令
mirv_exec alias 0fps    &quot;alias HlaeRecord {QUOTE}host_framerate 0   {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置host_framerate 0   {QUOTE}&quot;;
mirv_exec alias 60fps   &quot;alias HlaeRecord {QUOTE}host_framerate 60  {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置host_framerate 60  {QUOTE}&quot;;
mirv_exec alias 240fps  &quot;alias HlaeRecord {QUOTE}host_framerate 240 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置host_framerate 240 {QUOTE}&quot;;
mirv_exec alias 300fps  &quot;alias HlaeRecord {QUOTE}host_framerate 300 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置host_framerate 300 {QUOTE}&quot;;
mirv_exec alias 360fps  &quot;alias HlaeRecord {QUOTE}host_framerate 360 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置host_framerate 360 {QUOTE}&quot;;
mirv_exec alias 400fps  &quot;alias HlaeRecord {QUOTE}host_framerate 400 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置host_framerate 400 {QUOTE}&quot;;
mirv_exec alias 420fps  &quot;alias HlaeRecord {QUOTE}host_framerate 420 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置host_framerate 420 {QUOTE}&quot;;
mirv_exec alias 480fps  &quot;alias HlaeRecord {QUOTE}host_framerate 480 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置host_framerate 480 {QUOTE}&quot;;
mirv_exec alias 500fps  &quot;alias HlaeRecord {QUOTE}host_framerate 500 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置host_framerate 500 {QUOTE}&quot;;
mirv_exec alias 600fps  &quot;alias HlaeRecord {QUOTE}host_framerate 600 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置host_framerate 600 {QUOTE}&quot;;
mirv_exec alias 1200fps &quot;alias HlaeRecord {QUOTE}host_framerate 1200{QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置host_framerate 1200{QUOTE}&quot;;

// 默认不适用快捷指令设置帧率，有需要则删除↓ // 设置默认录制帧率
alias HlaeRecord &quot;&quot;;
//300fps

// 录屏设置切换的快捷指令
mirv_exec bind  pgup        &quot;ScreenRecord;continue;echo {QUOTE}&gt;&gt;&gt; 录屏开始{QUOTE}&quot;                   //PageUp   (OBS..)录屏开始
mirv_exec bind  pgdn        &quot;fps_max 200;demo_timescale 1;demo_pause;echo {QUOTE}&gt;&gt;&gt; 录屏结束{QUOTE}&quot;    //PageDown (OBS..)录屏结束
mirv_exec alias 60to240     &quot;alias ScreenRecord {QUOTE}fps_max 60 ;demo_timescale 0.25{QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置60→240 {QUOTE}&quot;
mirv_exec alias 60to300     &quot;alias ScreenRecord {QUOTE}fps_max 60 ;demo_timescale 0.2 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置60→300 {QUOTE}&quot;
mirv_exec alias 60to600     &quot;alias ScreenRecord {QUOTE}fps_max 60 ;demo_timescale 0.1 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置60→600 {QUOTE}&quot;
mirv_exec alias 90to180     &quot;alias ScreenRecord {QUOTE}fps_max 90 ;demo_timescale 0.5 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置90→180 {QUOTE}&quot;
mirv_exec alias 90to360     &quot;alias ScreenRecord {QUOTE}fps_max 90 ;demo_timescale 0.25{QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置90→360 {QUOTE}&quot;
mirv_exec alias 100to200    &quot;alias ScreenRecord {QUOTE}fps_max 100;demo_timescale 0.5 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置100→200{QUOTE}&quot;
mirv_exec alias 100to400    &quot;alias ScreenRecord {QUOTE}fps_max 100;demo_timescale 0.25{QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置100→400{QUOTE}&quot;
mirv_exec alias 100to500    &quot;alias ScreenRecord {QUOTE}fps_max 100;demo_timescale 0.2 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置100→500{QUOTE}&quot;
mirv_exec alias 120to240    &quot;alias ScreenRecord {QUOTE}fps_max 120;demo_timescale 0.5 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置120→240{QUOTE}&quot;
mirv_exec alias 120to480    &quot;alias ScreenRecord {QUOTE}fps_max 120;demo_timescale 0.25{QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置120→480{QUOTE}&quot;
mirv_exec alias 120to600    &quot;alias ScreenRecord {QUOTE}fps_max 120;demo_timescale 0.2 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置120→600{QUOTE}&quot;
mirv_exec alias 150to300    &quot;alias ScreenRecord {QUOTE}fps_max 150;demo_timescale 0.5 {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置150→300{QUOTE}&quot;
mirv_exec alias 300         &quot;alias ScreenRecord {QUOTE}fps_max 300;demo_timescale 1   {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置300{QUOTE}&quot;
mirv_exec alias 150         &quot;alias ScreenRecord {QUOTE}fps_max 150;demo_timescale 1   {QUOTE};echo {QUOTE}&gt;&gt;&gt; 已设置150{QUOTE}&quot;

//───────────────────────────────────────────────────────────────────
bind  L   &quot;theworld&quot;;                 // L 切换时停开关
bind  &#39;   &quot;mirv_time pausedtime 0&quot;;   // &#39; 回到时停最开始
mirv_exec alias theworld     &quot;theworld_on&quot;;
mirv_exec alias theworld_on  &quot;alias theworld theworld_off;mirv_time mode resumePaused;demo_pause;alias continue;echo;world1;world2;world3;echo;&quot;;
mirv_exec alias theworld_off &quot;alias theworld theworld_on;mirv_time mode curTime;echo;alias continue demo_resume;flows1;flows2;flows3;echo;&quot;;
mirv_exec alias world1       &quot;echo {QUOTE}▀▀█▀▀  █  █  █▀▀▀ 　  █   █  █▀▀▀█  █▀▀█  █     █▀▀▄ █{QUOTE}&quot;;
mirv_exec alias world2       &quot;echo {QUOTE}  █    █▀▀█  █▀▀▀ 　  █ █ █  █   █  █▄▄▀  █     █  █ ▀{QUOTE}&quot;;
mirv_exec alias world3       &quot;echo {QUOTE}  █    █  █  █▄▄▄ 　  █▄▀▄█  █▄▄▄█  █  █  █▄▄█  █▄▄▀ ▄{QUOTE}&quot;;
mirv_exec alias flows1       &quot;echo {QUOTE}▀▀█▀▀ ▀█▀  █▀▄▀█  █▀▀▀ 　  █▀▀▀  █     █▀▀▀█  █   █  █▀▀▀█ █{QUOTE}&quot;;
mirv_exec alias flows2       &quot;echo {QUOTE}  █    █   █ █ █  █▀▀▀ 　  █▀▀▀  █     █   █  █ █ █  ▀▀▀▄▄ ▀{QUOTE}&quot;;
mirv_exec alias flows3       &quot;echo {QUOTE}  █   ▄█▄  █   █  █▄▄▄ 　  █     █▄▄█  █▄▄▄█  █▄▀▄█  █▄▄▄█ ▄{QUOTE}&quot;;

// 天空解锁等指令的键位绑定
mirv_exec bind [ &quot;echo {QUOTE}&gt;&gt;&gt; nuke inferno train 天空解锁/还原{QUOTE};mat_suppress models/props/de_nuke/hr_nuke/nuke_skydome_001/nuke_skydome_001&quot;
mirv_exec bind ] &quot;echo {QUOTE}&gt;&gt;&gt; dust2 天空已解锁/还原{QUOTE};mat_suppress models/props/de_dust/hr_dust/dust_skybox/sky_dust2&quot;
mirv_exec bind \\ &quot;echo {QUOTE}&gt;&gt;&gt; 天空云朵已去除/还原{QUOTE};mat_suppress models/props/de_nuke/hr_nuke/nuke_skydome_001/nuke_clouds_001;mat_suppress models/props/de_nuke/hr_nuke/nuke_skydome_001/nuke_clouds_002;mat_suppress models\\props\\de_cbble\\dist_mountain_a\\dist_mountain_a.mdl;&quot;

//─────────────────────────────────────────────────────────────────────────
/////// 一键高亮击杀信息V5(控制台+声音提示) 制作：Purp1e	键位:  j  可修改
///// 切换到玩家第一人称视角 按下绑定的按键生效
/// &quot;assist&quot;切换助攻开/关 | &quot;onred&quot; / &quot;offred&quot; 开/关红色边框(再按j生效) | 关闭高亮后&quot;skip&quot;回退3s去除击杀条 | &quot;debug&quot; 调试
bind  j     focus;
alias focus focus_on;
mirv_exec   alias onred     &quot;alias border {QUOTE}mirv_deathmsg localPlayer xTrace{QUOTE};echo;echo {QUOTE}&gt;&gt;&gt; 一键高亮改为红色边框击杀条{QUOTE}&quot;;
mirv_exec   alias offred    &quot;alias border {QUOTE}mirv_deathmsg localPlayer default{QUOTE};echo;echo {QUOTE}&gt;&gt;&gt; 一键高亮改为无边框{QUOTE}&quot;;
mirv_exec   alias focus_on  &quot;alias focus focus_off;mirv_deathmsg filter add attackerMatch=!xTrace block=1 lastRule=1;NoSc;ThSm;AtBl; border; mp_display_kill_assists 0;mirv_deathmsg lifetime 100;playvol ui/armsrace_kill_01 1;echo;echo {QUOTE}&gt;&gt;&gt; 击杀高亮开启{QUOTE}&quot;;
mirv_exec   alias focus_off &quot;alias focus focus_on;mirv_deathmsg filter clear;mirv_deathmsg localPlayer default;mp_display_kill_assists 1;mirv_deathmsg lifetime 15;playvol ui/weapon_cant_buy 1;echo;echo {QUOTE}&gt;&gt;&gt; 击杀高亮关闭{QUOTE}&quot;;
// 默认一键高亮时红色边框击杀条  &quot;onred&quot;改成&quot;offred&quot;默认击杀条无边框
onred;
alias assist &quot;toggle mp_display_kill_assists&quot;
alias debug  &quot;mirv_deathmsg filter print&quot;
alias skip   &quot;mirv_skip time -3&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="屏蔽-显示击杀信息条" tabindex="-1"><a class="header-anchor" href="#屏蔽-显示击杀信息条" aria-hidden="true">#</a> 屏蔽/显示击杀信息条</h2><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>mirv_exec alias block &quot;mirv_deathmsg filter add block=1;{QUOTE}屏蔽击杀信息条{QUOTE}&quot;
mirv_exec alias disp  &quot;mirv_deathmsg filter clear;{QUOTE}显示击杀信息条{QUOTE}&quot;

//─────────────────────────────────────────────────────────────────────────
// 盲狙/穿烟/盲杀图标的隐藏
mirv_exec alias 111 NoSc_on;
mirv_exec alias NoSc_on  &quot;alias 111 NoSc_off;alias NoSc {QUOTE}mirv_deathmsg filter add noscope=0;{QUOTE};echo {QUOTE}&gt;&gt;&gt; 盲狙图标已隐藏；下次一键高亮时生效{QUOTE}&quot;
mirv_exec alias NoSc_off &quot;alias 111 NoSc_on;alias NoSc;echo {QUOTE}&gt;&gt;&gt; 盲狙图标已还原；下次一键高亮时生效{QUOTE}&quot;

mirv_exec alias 222 ThSm_on;
mirv_exec alias ThSm_on  &quot;alias 222 ThSm_off;alias ThSm {QUOTE}mirv_deathmsg filter add thrusmoke=0;{QUOTE};echo {QUOTE}&gt;&gt;&gt; 穿烟图标已隐藏；下次一键高亮时生效{QUOTE}&quot;
mirv_exec alias ThSm_off &quot;alias 222 ThSm_on;alias ThSm;echo {QUOTE}&gt;&gt;&gt; 穿烟图标已还原；下次一键高亮时生效{QUOTE}&quot;

mirv_exec alias 333 AtBl_on;
mirv_exec alias AtBl_on  &quot;alias 333 AtBl_off;alias AtBl {QUOTE}mirv_deathmsg filter add attackerblind=0;{QUOTE};echo {QUOTE}&gt;&gt;&gt; 盲杀图标已隐藏；下次一键高亮时生效{QUOTE}&quot;
mirv_exec alias AtBl_off &quot;alias 333 AtBl_on;alias AtBl;echo {QUOTE}&gt;&gt;&gt; 盲杀图标已还原；下次一键高亮时生效{QUOTE}&quot;

mirv_exec alias 444 doall_on;
mirv_exec alias doall_on  &quot;alias 444 doall_off;NoSc_on;ThSm_on;AtBl_on&quot;
mirv_exec alias doall_off &quot;alias 444 doall_on;NoSc_off;ThSm_off;AtBl_off&quot;
//─────────────────────────────────────────────────────────────────
//定义hint指令用来提示路径导入导出（不要被长度吓到）
//注：常见.bvh位置 C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\xxx.bvh
mirv_exec alias hint &quot;echo {QUOTE}═══ 路径导出(test是文件名)(fps为采样帧率 如300) ════{QUOTE};echo {QUOTE}mirv_camexport start test.bvh fps{QUOTE};echo {QUOTE}mirv_camexport stop{QUOTE};echo;echo {QUOTE}═══	       路径导入(从当前时间开始) 	 ════{QUOTE};echo {QUOTE}mirv_camimport start test.bvh{QUOTE};echo {QUOTE}mirv_camimport stop{QUOTE};echo;echo {QUOTE}# .bvh在csgo.exe同目录下 | fps务必高于最高可能用到的录制FPS{QUOTE};echo;&quot;;

//─────────────────────────────────────────────────────────────────
bind      q     &quot;sky&quot;    // Q 切换天空贴图（务必先解锁）
alias     sky   &quot;sky_1&quot;
mirv_exec alias &quot;sky_1&quot;  &quot;sv_skyname cs_tibet;alias sky sky_2;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  cs_tibet{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_2&quot;  &quot;sv_skyname embassy;alias sky sky_3;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  embassy{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_3&quot;  &quot;sv_skyname italy;alias sky sky_4;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  italy{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_4&quot;  &quot;sv_skyname jungle;alias sky sky_5;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  jungle{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_5&quot;  &quot;sv_skyname office;alias sky sky_6;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  office{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_6&quot;  &quot;sv_skyname sky_cs15_daylight01_hdr;alias sky sky_7;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  daylight01{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_7&quot;  &quot;sv_skyname sky_cs15_daylight02_hdr;alias sky sky_8;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  daylight02{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_8&quot;  &quot;sv_skyname sky_cs15_daylight03_hdr;alias sky sky_9;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  daylight03{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_9&quot;  &quot;sv_skyname sky_cs15_daylight04_hdr;alias sky sky_10;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  daylight04{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_10&quot; &quot;sv_skyname sky_dust;alias sky sky_11;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  dust{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_11&quot; &quot;sv_skyname vietnam;alias sky sky_12;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  vietnam{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_12&quot; &quot;sv_skyname cs_baggage_skybox_;alias sky sky_13;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  cs_baggage{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_13&quot; &quot;sv_skyname vertigo;alias sky sky_14;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  vertigo{QUOTE};echo;&quot;
mirv_exec alias &quot;sky_14&quot; &quot;sv_skyname vertigoblue_hdr;alias sky sky_1;echo {QUOTE}&gt;&gt;&gt; 当前天空贴图     	:  vertigoblue_hdr{QUOTE};echo;&quot;

//───────────────────────────────────────────────────────────────────
// 前后侧键 +-播放速度 20% 25% 100% 400% 800%
bind  mouse5 	&quot;gear_up&quot;
bind  mouse4 	&quot;gear_down&quot;
alias gear_up 	&quot;gear4&quot;
alias gear_down &quot;gear14&quot;
alias gear15 	&quot;demo_timescale 0.2;alias gear_up gear14; alias gear_down gear15;echo Speed X0.2&quot;
alias gear14	&quot;demo_timescale 0.25;alias gear_up gear1; alias gear_down gear15;echo Speed X0.25&quot;
alias gear1     &quot;demo_timescale 1;alias gear_up gear4; alias gear_down gear14;echo Speed X1&quot;
alias gear4     &quot;demo_timescale 4;alias gear_up gear8; alias gear_down gear1;echo Speed X4&quot;
alias gear8     &quot;demo_timescale 8;alias gear_up gear8; alias gear_down gear4;echo Speed X8&quot;

//───────────────────────────────────────────────────────────────────
// F9  开关VGUI 用于Reshade
bind  F9      &quot;vgui&quot;;
alias vgui    &quot;vguiOff&quot;;
alias vguiOff &quot;alias vgui vguiOn ;r_drawvgui 0;playvol ui/armsrace_kill_01 1&quot;;
alias vguiOn  &quot;alias vgui vguiOff;r_drawvgui 1;playvol ui/weapon_cant_buy 1&quot;;

//───────────────────────────────────────────────────────────────────
//控制台使用mute关闭游戏设置中的MVP、回合开始结束、无线电等声音
alias mute      &quot;snd_roundstart_volume 0;snd_roundend_volume 0;snd_mapobjective_volume 0;snd_tensecondwarning_volume 0;snd_deathcamera_volume 0;snd_mvp_volume 0;mirv_snd_filter block +player\\\\vo\\\\\\*;mirv_snd_filter block +radio\\\\\\*&quot;
//默认关闭各种声音，录制比较纯净的声音（删除↓ // 开启）
//mute

//开关式指令 caster 用来屏蔽解说之外的声音，方便录解说音轨
mirv_exec alias caster     &quot;caster_on&quot;;
mirv_exec alias caster_on  &quot;alias caster caster_off;snd_filter player\\vo\\;mirv_snd_filter block +player\\\\vo\\\\\\*;echo {QUOTE}&gt;&gt;&gt; 解说之外声音已屏蔽{QUOTE}&quot;;
mirv_exec alias caster_off &quot;alias caster caster_on ;snd_filter {QUOTE}{QUOTE};mirv_snd_filter clear;echo {QUOTE}&gt;&gt;&gt; 解说之外声音已还原{QUOTE}&quot;;

//───────────────────────────────────────────────────────────────────
//开启raw层(原始画面) 更多分层录制的指令请使用stream.cfg
mirv_streams add  normal raw;
mirv_streams edit raw    drawHud -1;
mirv_streams edit raw    record   1;


//输出控制台提示
clear
echo &quot;█▀▀█  █  █  █▀▀█  █▀▀█ ▄█  █▀▀▀    █▀▀ █▀▀ █▀▀▀ 　 ▄█    ▄▀▀▄&quot; 
echo &quot;█▄▄█  █  █  █▄▄▀  █▄▄█  █  █▀▀▀    █   █▀▀ █ ▀█ 　  █    █▄▄ &quot;
echo &quot;█     ▀▄▄▀  █  █  █    ▄█▄ █▄▄▄    ▀▀▀ ▀   ▀▀▀▀ 　 ▄█▄ █ ▀▄▄▀&quot;
echo &quot;═════════════════════════════════════════════════════════════&quot;
echo &quot;─────────────────────────  指令  ─────────────────────────────&quot;
echo &quot;──── 关闭BGM/MVP/无线电声音	        :  mute&quot;
echo &quot;──── 屏蔽解说以外的声音（开关式）  	:  caster&quot;
echo &quot;──── 路径导入导出指令提示		:  hint&quot;
echo &quot;──── 隐藏/显示击杀信息	    	:  block / disp&quot;
echo &quot;──── 一键高亮相关指令        	:  skip (回退3s) | onred 红边框 | offred 无边框 | assist 开关助攻&quot;
echo &quot;──── 一键高亮击杀图标隐藏        	:  111 盲狙      | 222 穿烟    | 333 盲杀      | 444 盲狙+穿烟+盲杀
echo &quot;──── 录制帧率300fps(默认0) 	:  host_framerate 300  用↓指令&quot;
echo &quot;──── 录制帧率快捷指令 		:  0fps 240fps 300fps 480fps等&quot;
echo &quot;──── 录屏慢放快捷指令 		:  60to240 90to360 120to240等&quot;
echo &quot;──── 使用统一准星  		:  cl_show_observer_crosshair 0;&quot;
echo &quot;─────────────────────  单独调整玩家音量  ───────────────────────────&quot;
echo &quot;──── 显示当前玩家id和音量		:  voice_player_volume&quot;
echo &quot;──── 设置音量	    		:  voice_player_volume 玩家id 音量&quot;
echo &quot;──── 例如静音玩家3	    		:  voice_player_volume 3 0&quot;
echo &quot;───────────────── 修改玩家名称（第一人称视角时使用） ─────────────────&quot;
echo &quot;──── 中文名请在游戏外写好复制进控制台	:  mirv_replace_name filter add Trace Purp1e&quot;
echo &quot;──── 还原真实名称  		:  mirv_replace_name filter clear&quot;
echo &quot;────────────────────────  快捷键  ────────────────────────────&quot;
echo &quot;──── 切换常用天空贴图 	        :  Q&quot;
echo &quot;──── 镜头摆放模式 ESC退出      	:  T&quot;
echo &quot;──── 游戏/玩家/解说声音分离录制	:  U&quot;
echo &quot;──── 镜头激活开关        		:  I&quot;
echo &quot;──── 镜头轨迹显示    		:  O&quot;
echo &quot;──── demo暂停/继续           	:  P 或 鼠标中键（mouse3）&quot;
echo &quot;──── 解锁Nuke Train Inferno天空 	:  [&quot;
echo &quot;──── 解锁Dust2天空     		:  ]&quot;
echo &quot;──── 去除天空中所有的云朵   	 	:  \\&quot;
echo &quot;─────────────────────────────────────────────────────────────&quot;
echo &quot;──── 侧边状态栏(血条、KDA)     	:  G&quot;
echo &quot;──── HUD只保留准星和击杀    	:  H&quot;
echo &quot;──── 一键高亮击杀信息         	:  J&quot;
echo &quot;──── 开关语音      		:  K&quot;
echo &quot;──── 时停“砸瓦鲁多”开关        	:  L&quot;
echo &quot;──── 回到时停的最开始0s        	:  &#39;&quot;
echo &quot;─────────────────────────────────────────────────────────────&quot;
echo &quot;──── x光       	   		:  X&quot;
echo &quot;──── 准心开关      		:  V&quot;
echo &quot;──── 开关HUD      		:  B&quot;
echo &quot;──── 开关雷达      		:  N&quot;
echo &quot;──── 静音           	 	:  M&quot;
echo &quot;──── 上一回合      		:  ,&quot;
echo &quot;──── 下一回合      		:  .&quot;
echo &quot;──── 更改FOV至105  		:  -&quot;
echo &quot;──── 恢复FOV为默认  		:  =&quot;
echo &quot;─────────────────────────────────────────────────────────────&quot;
echo &quot;──── 打开demoui      		:  shift+F2&quot;
echo &quot;──── 添加镜头      		:  Capslock&quot;
echo &quot;──── 清空镜头      		:  delete&quot;
echo &quot;──── +播放速度      		:  前侧键（mouse5）&quot;
echo &quot;──── -播放速度      		:  后侧键（mouse4）&quot;
echo &quot;─────────────────────────────────────────────────────────────&quot;
echo &quot;──── 录屏设置开启  		:  PgUp&quot;
echo &quot;──── 录屏设置关闭  		:  PgDn&quot;
echo &quot;──── HLAE录制开始  		:  ↑&quot;
echo &quot;──── HLAE录制结束  		:  ↓&quot;
echo &quot;──── 设置当前Tick开始录制	 	:  F5&quot;
echo &quot;──── 设置当前Tick结束录制	 	:  F6&quot;
echo &quot;──── 打印mirv_cmd信息  	 	:  F7&quot;
echo &quot;──── 清除所有mirv_cmd指令	 	:  F8&quot;
echo &quot;──── 开关VGUI          	 	:  F9&quot;
echo &quot;──── 加载自拍杆CFG     	 	:  F10&quot;
echo &quot;──── 加载分层录制CFG   	 	:  F11&quot;
echo &quot;──── 加载FFMPEG录制CFG 	 	:  F12&quot;
echo &quot;═════════════════════════════════════════════════════════════&quot;

//判断hlae是否正常开启
alias hlae_test &quot;echo x&quot;;
mirv_exec alias hlae_test &quot;echo {QUOTE}成功√{QUOTE}&quot;
echo &quot;HLAE启动状态：&quot;;hlae_test;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function U(E,Q){const s=a("ExternalLinkIcon");return t(),l("div",null,[r,o(" more "),e("div",v,[m,e("p",null,[i("═══════════════════════════════════════════"),_,i(" Config Preset V1.6 by Purp1e"),q,i(" CFG预设（Purp1e制作）"),b,i(" #2021/8/14#"),h,e("a",g,[i("https://space.bilibili.com/73115492"),d(s)]),T,i(" ═══════════════════════════════════════════")])]),O])}const x=n(c,[["render",U],["__file","hlae.html.vue"]]);export{x as default};
